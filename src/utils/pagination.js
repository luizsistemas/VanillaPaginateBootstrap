class Pagination {
  constructor({ container, page = 1, rowsPerPage = 20, changePage }) {
    this.container = container
    this.page = page
    this.rowsPerPage = rowsPerPage
    this.changePage = changePage
    this.startPage = 1
    this.endPage = 10
    this.pages = 10
  }

  addClasses(li, a) {
    li.classList.add('page-item')
    a.classList.add('page-link')
  }

  buildBtnPrev() {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const prevPage = this.startPage > 1 ? this.startPage - 1 : 1

    a.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.page = +a.dataset.page
      this.changePage(this.page, this.rowsPerPage)
      this.renderPaginate()
    })

    this.addClasses(li, a)

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
      this.page = +button.dataset.page
      this.changePage(this.page, this.rowsPerPage)
      this.renderPaginate()
    })
  }

  buildBtnPage(page, contentLink, currentPage) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    this.addClasses(li, a)
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
      this.page = +a.dataset.page
      this.changePage(this.page, this.rowsPerPage)
      this.renderPaginate()
    })

    this.addClasses(li, a)

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
    let totalPage = Math.ceil(this.totalRows / this.rowsPerPage)
    if (this.page < 1) this.page = 1
    else if (this.page > totalPage) this.page = totalPage

    if (totalPage <= this.pages) {
      this.startPage = 1
      this.endPage = totalPage
    } else {
      const pageAtBeginning = Math.floor(this.pages / 2)
      const pageAtEnd = Math.ceil(this.pages / 2) - 1
      if (this.page <= pageAtBeginning) {
        this.startPage = 1
        this.endPage = this.pages
      } else if (this.page + pageAtEnd >= totalPage) {
        this.startPage = totalPage - +this.pages + 1
        this.endPage = totalPage
      } else {
        this.startPage = this.page - pageAtBeginning
        this.endPage = this.page + pageAtEnd
      }
    }

    containerPaginate.appendChild(this.buildBtnPrev())

    for (let i = this.startPage; i <= this.endPage; i++) {
      const currentPage = this.page == i
      containerPaginate.appendChild(this.buildBtnPage(i, i, currentPage))
    }

    containerPaginate.appendChild(this.buildBtnNext())
  }

  renderPaginate(totalRows) {
    this.container.innerHTML = ''
    if (totalRows) this.totalRows = totalRows
    const content = document.createElement('nav')
    content.innerHTML = `<ul class="pagination"></ul>`
    const paginate = content.querySelector('.pagination')
    this.getPages(paginate)
    this.container.appendChild(content)
  }
}

export default Pagination
