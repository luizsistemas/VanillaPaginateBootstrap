class Pagination {
  constructor({ container, page, totalRows, changePage, rowsPerPage }) {
    this.container = container
    this.page = page
    this.changePage = changePage
    this.rowsPerPage = rowsPerPage
    this.totalRows = totalRows
    this.startPage = 0
    this.endPage = 10
  }

  handleButton(button) {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
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

  setRangePages(totalPage) {
    console.log(this.page, totalPage)
    if (this.page < 10) {
      this.startPage = 1
      this.endPage = 10
    } else if (this.page >= 10 && this.page <= totalPage) {
      this.startPage = this.page
      this.endPage += 10
    } else {
      this.startPage = totalPage
      this.endPage = totalPage
    }
  }

  getPages(containerPaginate) {
    const totalPage = Math.ceil(this.totalRows / this.rowsPerPage)
    this.setRangePages(totalPage)
    const prevPage = this.startPage > 1 ? this.startPage - 1 : 1
    const nextPage = this.endPage < totalPage ? this.endPage + 1 : this.endPage
    const prevDisable = this.startPage === 1
    const nextDisable = this.endPage === totalPage

    containerPaginate.appendChild(
      this.buildBtnPage(
        prevDisable,
        prevPage,
        `<span aria-hidden="true">&laquo;</span>`,
        false
      )
    )

    for (let i = this.startPage; i <= this.endPage; i++) {
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
