class Pagination {
  constructor({ container, page, totalRows, changePage, rowsPerPage }) {
    this.container = container
    this.page = page
    this.changePage = changePage
    this.rowsPerPage = rowsPerPage
    this.totalRows = totalRows
    this.startPage = 1
    this.endPage = 10
  }

  buildBtnPrev() {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const prevPage = this.startPage > 1 ? this.startPage - 1 : 1

    a.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.startPage = this.startPage - 10 > 1 ? this.startPage - 10 : 1
      this.endPage = this.startPage + 9
      this.page = a.dataset.page
      this.changePage(this.page, this.rowsPerPage)
      this.renderPaginate()
    })

    li.classList.add('page-item')
    a.classList.add('page-link')
    a.dataset.page = prevPage
    a.innerHTML = `<span aria-hidden="true">&laquo;</span>`

    if (this.startPage === 1) {
      li.classList.add('disabled')
      a.setAttribute('aria-disabled', true)
    }

    this.handleButton(a)
    li.appendChild(a)
    return li
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

  buildBtnPage(page, contentLink, currentPage) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    li.classList.add('page-item')
    a.classList.add('page-link')
    a.dataset.page = page
    a.innerHTML = contentLink
    if (currentPage) {
      li.classList.add('active')
      li.setAttribute('aria-current', 'page')
    }
    this.handleButton(a)
    li.appendChild(a)
    return li
  }

  buildBtnNext() {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const nextPage = this.endPage + 1
    const totalPage = Math.ceil(this.totalRows / this.rowsPerPage)

    a.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.endPage =
        this.endPage + 10 <= totalPage ? this.endPage + 10 : this.endPage
      this.startPage = this.endPage - 9
      this.page = a.dataset.page
      this.changePage(this.page, this.rowsPerPage)
      this.renderPaginate()
    })

    li.classList.add('page-item')
    a.classList.add('page-link')
    a.dataset.page = nextPage
    a.innerHTML = `<span aria-hidden="true">&raquo;</span>`

    if (this.endPage === totalPage) {
      li.classList.add('disabled')
      a.setAttribute('aria-disabled', true)
    }

    this.handleButton(a)
    li.appendChild(a)
    return li
  }

  getPages(containerPaginate) {
    containerPaginate.appendChild(this.buildBtnPrev())

    for (let i = this.startPage; i <= this.endPage; i++) {
      const currentPage = this.page == i
      console.log(this.page, i, currentPage)
      containerPaginate.appendChild(this.buildBtnPage(i, i, currentPage))
    }

    containerPaginate.appendChild(this.buildBtnNext())
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
