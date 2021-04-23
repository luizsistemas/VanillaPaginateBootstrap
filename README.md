# Vanilla Paginate Bootstrap 5

Paginate with Javascript (Webpack) Vanilla JS and Bootstrap 5.

## Example

```javascript
import Pagination from './utils/pagination'
...

// fetching comments from the jsonplaceholder API.
async function loadComments(page, rowsPerPage) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${rowsPerPage}`
  )
  render(response.data)
}
...

```

Insert in the html the div that will contain the pagination:

```javascript
const element = document.getElementById('app')
    <h1>Comments</h1>
    <div class="container">/* list of comments */</div>
    <div class="paginate"></div>
  `
```

Call the renderPaginate method to render the pagination on the page:

```javascript
new Pagination({
  container: element.querySelector('.paginate'), // div that will receive pagination
  page: 1
  changePage: loadComments, // method that accesses the API.
  rowsPerPage: 5,
}).renderPaginate(500)

```

This is it. ;)
