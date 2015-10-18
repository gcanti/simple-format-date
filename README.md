A simple clean way to format dates with Javascript

# Setup

```sh
npm install simple-format-date
```

# Usage

```js
var formatDate = require('simple-format-date');

formatDate(new Date(1973, 0, 2)); // => '01/02/1973'
formatDate(new Date(1973, 0, 2), { template: '<%= DD %>/<%= MM %>/<%= YY %>' }); // => '02/01/1973' (italian format)
```

# API

```js
formatDate(date, options)
```

where:

- `date` the date to format
- `options`
  - `template: string | Function` the format to use in ejs syntax (default `<%= MM %>/<%= DD %>/<%= YY %>`) where `parts: Parts` is an object containing the following keys:
    - `Y` short year (15 for 2015)
    - `YY` numeric long year
    - `M` numeric month (9 for September)
    - `MM` padded month ('09' for September)
    - `D` numeric day
    - `DD` padded day
    - `h` numeric hours
    - `hh` padded hours
    - `m` numeric minutes
    - `mm` padded minutes

    or a function with the following signature `(parts: Parts) => string`
