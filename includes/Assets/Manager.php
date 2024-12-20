<?php

namespace Akash\JobPlace\Assets;

/**
 * Asset Manager class.
 *
 * Responsible for managing all of the assets (CSS, JS, Images, Locales).
 */
class Manager {

    /**
     * Constructor.
     *
     * @since 0.2.0
     */
    public function __construct() {
        add_action( 'init', [ $this, 'register_all_scripts' ], 10 );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_assets' ] );
    }

    /**
     * Register all scripts and styles.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function register_all_scripts() {
        $this->register_styles( $this->get_styles() );
        $this->register_scripts( $this->get_scripts() );
    }

    /**
     * Get all styles.
     *
     * @since 0.2.0
     *
     * @return array
     */
    public function get_styles(): array {
        return [
            'job-place-custom-css' => [
                'src'     => JOB_PLACE_BUILD . '/style-index.css',
                'version' => filemtime( JOB_PLACE_DIR . '/build/style-index.css' ),
                'deps'    => [],
            ],
            'job-place-css' => [
                'src'     => JOB_PLACE_BUILD . '/index.css',
                'version' => filemtime( JOB_PLACE_DIR . '/build/index.css' ),
                'deps'    => [ 'job-place-custom-css' ],
            ],
        ];
    }

    /**
     * Get all scripts.
     *
     * @since 0.2.0
     *
     * @return array
     */
    public function get_scripts(): array {
        $dependency = require_once JOB_PLACE_DIR . '/build/index.asset.php';

        return [
            'job-place-app' => [
                'src'       => JOB_PLACE_BUILD . '/index.js',
                'version'   => filemtime( JOB_PLACE_DIR . '/build/index.js' ),
                'deps'      => $dependency['dependencies'],
                'in_footer' => true,
            ],
        ];
    }

    /**
     * Register styles.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function register_styles( array $styles ) {
        foreach ( $styles as $handle => $style ) {
            wp_register_style( $handle, $style['src'], $style['deps'], $style['version'] );
        }
    }

    /**
     * Register scripts.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function register_scripts( array $scripts ) {
        foreach ( $scripts as $handle =>$script ) {
            wp_register_script( $handle, $script['src'], $script['deps'], $script['version'], $script['in_footer'] );
        }
    }

    /**
     * Enqueue admin styles and scripts.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function enqueue_admin_assets() {
        wp_enqueue_style( 'job-place-css' );
        wp_enqueue_script( 'job-place-app' );
    }
}
