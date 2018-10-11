RESTFUL ROUTES

name        path                            verb          desc.
====================================================================================
INDEX       /products                       GET         Display all products
NEW         /products/new                   GET         Display form to create a new product
CREATE      /products                       POST        Add a new product to DB
SHOW        /products/:id                   GET         Shows info about one product
EDIT        /products/:id/edit              GET         Show edit form for one product
UPDATE      /products/:id                   PUT         Update a particular product, and redirect
DESTROY     /products/:id                   DELETE      Delete a particular product, and redirect

NEW         /products/:id/comments/new      GET
CREATE      /products/:id/comments          POST
