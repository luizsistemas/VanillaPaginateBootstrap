import axios from 'axios'
import Pagination from './utils/pagination'
import './style.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

async function loadComments(page, rowsPerPage) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${rowsPerPage}`
  )
  render(response.data)
}

function render(data) {
  let comments = data
  let pageHtml = ``
  comments.forEach((comment) => {
    pageHtml += `
      <div class="comment">
        <h4 class="title">${comment.name} </h4>
        <small>${comment.email}</small>
        <p>${comment.body} ${comment.id}</p>
      </div>`
  })
  const container = document.querySelector('.container')
  container.innerHTML = pageHtml
}

async function component() {
  const element = document.getElementById('app')
  let currentPage = 1
  console.log(element)
  element.innerHTML = `
    <h1>Comments</h1>
    <div class="container"></div>
    <div class="paginate"></div>
  `
  await loadComments(1, 5)

  new Pagination({
    container: element.querySelector('.paginate'),
    page: currentPage,
    totalRows: 500,
    changePage: loadComments,
    rowsPerPage: 5,
  }).renderPaginate()
}

component()
