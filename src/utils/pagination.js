class Pagination {
  constructor({ container, page, totalRows, changePage, rowsPerPage }) {
    this.container = container
    this.page = page
    this.changePage = changePage
    this.rowsPerPage = rowsPerPage
    this.totalRows = totalRows
  }

  handleButton(button) {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      this.page = button.dataset.page
      this.changePage(this.page, this.rowsPerPage)
      this.renderPaginate()
    })
  }

  buildBtnPage(disable, page, contentLink, currentPage) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    li.classList.add('page-item')
    a.classList.add('page-link')
    a.dataset.page = page
    a.innerHTML = contentLink
    if (disable) {
      li.classList.add('disabled')
      a.setAttribute('aria-disabled', true)
    }
    if (currentPage) {
      li.classList.add('active')
      li.setAttribute('aria-current', 'page')
    }
    this.handleButton(a)
    li.appendChild(a)
    return li
  }

  getPages(containerPaginate) {
    let startPage, endPage
    const totalPage = Math.ceil(this.totalRows / this.rowsPerPage)
    if (this.page < 10) {
      startPage = this.page
      endPage = 10
    } else if (this.page >= 10 && this.page <= totalPage) {
      startPage = this.page
      endPage = this.page + 10
    } else {
      startPage = totalPage
      endPage = totalPage
    }
    const prevPage = startPage > 1 ? startPage - 1 : 1
    const nextPage = endPage < totalPage ? endPage + 1 : endPage
    const prevDisable = startPage === 1
    const nextDisable = endPage === totalPage

    containerPaginate.appendChild(
      this.buildBtnPage(
        prevDisable,
        prevPage,
        `<span aria-hidden="true">&laquo;</span>`,
        false
      )
    )

    for (let i = startPage; i <= endPage; i++) {
      const active = this.page === i
      containerPaginate.appendChild(this.buildBtnPage(false, i, i, active))
    }

    containerPaginate.appendChild(
      this.buildBtnPage(
        nextDisable,
        nextPage,
        `<span aria-hidden="true">&raquo;</span>`,
        false
      )
    )
  }

  renderPaginate() {
    this.container.innerHTML = ''
    const content = document.createElement('nav')
    content.innerHTML = `<ul class="pagination"></ul>`
    const paginate = content.querySelector('.pagination')
    this.getPages(paginate)
    this.container.appendChild(content)
  }
}

export default Pagination
