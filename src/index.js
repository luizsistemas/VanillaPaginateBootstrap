import axios from 'axios'
import Pagination from './utils/pagination'
import './style.css'

function loadComments(page, rowsPerPage) {
  axios
    .get(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${rowsPerPage}`
    )
    .then(({ data, headers }) => {
      render(data)
    })
}

function render(data) {
  let comments = data
  let pageHtml = ``
  let currentPage = 1

  comments.forEach((comment) => {
    pageHtml += `
      <div class="comment">
        <h4 class="title">${comment.name} </h4>
        <small>${comment.email}</small>
        <p>${comment.body} ${comment.id}</p>
      </div>`
  })
  pageHtml += `<div class="paginate"></div>`
  const container = document.querySelector('.container')
  container.innerHTML = pageHtml
  new Pagination({
    container: container.querySelector('.paginate'),
    page: currentPage,
    totalRows: 100,
    changePage: loadComments,
    rowsPerPage: 5,
  }).renderPaginate()
}

function component() {
  const element = document.getElementById('app')

  loadComments(1, 5)

  element.innerHTML = `
  <h1>Comments</h1>
  <div class="container"></div>
  `

  return element
}

document.body.appendChild(component())
