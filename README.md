# wp-react-kit
A simple starter kit to work in WordPress with WP-script, React, React Router, Tailwind CSS, PostCSS, Eslint, i18n, PHP OOP plugin architecture easily in a minute.

----

### Quick Start
```sh
# Clone the Git repository
git clone https://github.com/ManiruzzamanAkash/wp-react-kit.git

# Install node module packages
npm i

# Install PHP-composer dependencies [It's empty]
composer install

# Start development mode
npm start

# Start development with hot reload (Frontend components will be updated automatically if any changes are made)
npm run start:hot

# To run in production
npm run build
```

After running `start`, or `build` command, there will be a folder called `/build` will be generated at the root directory.

### Browse Plugin

http://localhost/wpex/wp-admin/admin.php?page=jobplace#/

Where, `/wpex` is the project root folder inside `/htdocs`.

Or, it could be your custom processed URL.

### PHP Coding Standards - PHPCS

**Get all errors of the project:**
```sh
vendor/bin/phpcs .
```

**Fix all errors of the project:**
```sh
vendor/bin/phpcbf .
```

<details>
    <summary>Options for specific files:</summary>

**Get specific file errors of the project:**
```sh
vendor/bin/phpcs job-place.php
```


**Fix specific file errors of the project:**
```sh
vendor/bin/phpcbf job-place.php
```
</details>


### Versions
<details>
    <summary>Simple Version with raw PHP</summary>

https://github.com/ManiruzzamanAkash/wp-react-kit/releases/tag/vSimple
</details>

<details>
    <summary>Version with EsLint and i18n Setup</summary>

https://github.com/ManiruzzamanAkash/wp-react-kit/releases/tag/vSimpleEslint
</details>


<details>
    <summary>Version with EsLint, i18n and React Router Setup</summary>

https://github.com/ManiruzzamanAkash/wp-react-kit/releases/tag/vReactRouter
</details>

<details>
    <summary>Version with PostCSS and Tailwind CSS Setup</summary>

https://github.com/ManiruzzamanAkash/wp-react-kit/releases/tag/vTailwindCss
</details>

<details>
    <summary>Version with PHPCS setup</summary>

https://github.com/ManiruzzamanAkash/wp-react-kit/releases/tag/vPHPCS
</details>

<details>
    <summary>Version with PHP OOP Architecture</summary>

https://github.com/ManiruzzamanAkash/wp-react-kit/releases/tag/vPhpOOP
</details>



### File structure:
<details>
    <summary>Simple Version Code-Structure:</summary>

![Simple Version](https://i.ibb.co/3fmYfks/wp-react-kit-simple-version.png "Demo in Simple Version")
</details>

### Demo with Simple Version

<details>
    <summary>Demo in WordPress plugin:</summary>

![Demo Plugin](https://i.ibb.co/NpVYrxN/wp-react-kit.png "Demo in WordPress plugin")
</details>


### Demo With React Router & Menu

![Demo Plugin](https://i.ibb.co/vPp9Mm9/Wp-Scripts-Demo.png "Demo in WordPress plugin")
