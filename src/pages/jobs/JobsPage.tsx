/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { useNavigate } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from '../../components/button/Button';
import Input from '../../components/inputs/Input';
import Layout from '../../components/layout/Layout';
import Table from '../../components/table/Table';
import TableLoading from '../../components/loading/TableLoading';
import PageHeading from '../../components/layout/PageHeading';
import { useSelect, useDispatch } from '@wordpress/data';
import store from '../../data/jobs';
import {
    useTableHeaderData,
    useTableRowData,
} from '../../components/jobs/use-table-data';
import SelectCheckBox from '../../components/jobs/SelectCheckBox';

export default function JobsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(
        new URLSearchParams(location.search).get('pages') || 1
    );
    const searched = new URLSearchParams(location.search).get('s');
    const [search, setSearch] = useState<string>(
        typeof searched === 'string' ? searched : ''
    );
    const [checkedAll, setCheckedAll] = useState(false);

    const checked: number[] = [];
    const jobs = useSelect((select) => select(store).getJobs({}), []);
    const totalJobs = useSelect((select) => select(store).getTotal(), 0);
    const jobFilters = useSelect((select) => select(store).getFilters(), {});
    const loadingJobs = useSelect(
        (select) => select(store).getLoadingJobs(),
        false
    );

    useEffect(() => {
        dispatch(store)
            .setFilters({
                ...jobFilters,
                page,
                search,
            })
            .then((success) => {})
            .catch((error) => {});
    }, [page, search]);

    /**
     * Process search-bar, tab and pagination clicks.
     *
     * @param  pagePassed
     * @param  searchPassed
     * @return {void}
     */
    const processAndNavigate = (
        pagePassed: number = 0,
        searchPassed: string | null = null
    ) => {
        const pageData = pagePassed === 0 ? page : pagePassed;
        const searchData = searchPassed === '' ? search : searchPassed;
        navigate(`/jobs?pages=${pageData}&s=${searchData}`);
        setPage(pageData);

        dispatch(store)
            .setFilters({
                ...jobFilters,
                page: pageData,
                search: searchData,
            })
            .then((success) => {})
            .catch((error) => {});
    };

    /**
     * Check a Job.
     *
     * @param {number}  jobId
     * @param {boolean} isChecked
     *
     * @return {void}
     */
    const checkJob = (jobId: number, isChecked = false) => {
        const jobsData = [];
        if (jobId === 0) {
            if (isChecked) {
                jobsData.push(...jobs.map((job) => job.id));
            }
            //  dispatch(checkedJobAction(templateId, jobsData));
        } else {
            //  dispatch(checkedJobAction(templateId, checked));
        }
    };

    /**
     * Handle Checked and unchecked.
     */
    useEffect(() => {
        if (jobs.length === checked.length && checked.length > 0) {
            setCheckedAll(true);
        } else {
            setCheckedAll(false);
        }
    }, [jobs, checked]);

    /**
     * Get Page Content - Title and New Job button.
     *
     * @return JSX.Element
     */
    const pageTitleContent = (
        <div className="flex">
            <div className="flex-6 mr-3">
                <PageHeading text={__('Jobs', 'jobplace')} />
            </div>
            <div className="flex-1 text-left">
                <Button
                    text={__('New', 'jobplace')}
                    type="primary"
                    icon={faPlus}
                    disabled={loadingJobs}
                    onClick={() => navigate('/jobs/new')}
                    style={{ background: '#256D85' }}
                />
            </div>
        </div>
    );

    /**
     * Get Right Side Content - Jobs Search Input.
     *
     * @param  data
     */
    const pageRightSideContent = (
        <Input
            type="text"
            placeHolder={__('Search Jobs…', 'jobplace')}
            onChange={(data) => {
                setSearch(data.value);
                processAndNavigate(page, data.value);
            }}
            value={search}
            inputClass="w-36 sm:w-auto"
        />
    );

    const tableHeaders = useTableHeaderData();
    const tableRows = useTableRowData(jobs, checked);

    return (
        <Layout
            title={pageTitleContent}
            slug="jobs"
            hasRightSideContent={true}
            rightSideContent={pageRightSideContent}
        >
            {loadingJobs ? (
                <TableLoading headers={tableHeaders} count={5} />
            ) : (
                <>
                    {checked.length > 0 && (
                        <SelectCheckBox checked={checked} onChange={checkJob} />
                    )}

                    <Table
                        headers={tableHeaders}
                        rows={tableRows}
                        totalItems={totalJobs}
                        perPage={10}
                        onCheckAll={(isChecked: boolean) => {
                            checkJob(0, isChecked);
                            setCheckedAll(isChecked);
                        }}
                        checkedAll={checkedAll}
                        noDataMessage={__(
                            'Sorry !! No jobs found…',
                            'jobplace'
                        )}
                        currentPage={
                            typeof page === 'number' ? parseInt(page) : 1
                        }
                        onChangePage={(page) =>
                            processAndNavigate(page, search)
                        }
                    />
                </>
            )}
        </Layout>
    );
}
