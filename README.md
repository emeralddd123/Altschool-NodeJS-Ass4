# Altschool-NodeJS-Ass4

  <body>
    <h1>Documentation for StoreAPI</h1>
    <br>
    <h3>Key Features</h3>
    <ul>
        <li>user can register</li>
        <li>user can login</li>
        <li>support both Basic Authentication and apikey authentication</li>
        <li>Non-admin user can't edit products </li>
        <li>user can logout, if user is associated with a key. it will delete it</li>
    </ul>
    <br>
    <h2>Available Endpoints</h2>
    <br>
    <h3>Authentication Endpoints</h3>
    <ul>
      <li>
        <b>GET \user </b> for retrieving all the registered user (forOnlyAdmin)
      </li>
      <li><b>GET \user\me</b> for user to get his own info</li>
      <li><b>POST \user\signup</b> for registering</li>
      <li><b>POST user\login</b> to login into the api, returns an apikey</li>
      <li><b>POST \user\logout</b> to logout. deletes users apikey if there is any</li>
    </ul>
    <br>
    <h3>Products Endpoints</h3>
    <ul>
      <li>
        <b>GET \product </b> for retrieving all the available product in the store
      </li>
      <li><b>GET \product\id</b> for retrieving a single product from store</li>
      <li><b>POST \product</b> for adding product to the store</li>
      <li><b>PUT \product\id</b> for updating an existing product in the store</li>
      <li><b>DELETE \product\id</b> for deleting an in the store</li>
    </ul>
  </body>
