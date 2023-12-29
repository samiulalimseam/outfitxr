class FittingRoomButton extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.id = this.dataset.productId
    this.sku = this.dataset.sku
    this.product_lookup = this.dataset.productLookup
    this.testMode = this.dataset.testMode == 'on' ? true : false

    console.log(this.testMode, 'testMode: ')

    this.button = this.querySelector('button')
    this.button.addEventListener('click', this.viewInFittingRoom.bind(this))

    this.getFittingRoomDetails()
  }

  async getFittingRoomDetails() {
    let url = `https://api.avatarxr.me/product_lookup?product_id=${this.id}&origin_domain=${window.location.hostname}`
    if(this.product_lookup == 'sku') url = `https://api.avatarxr.me/product_lookup?sku=${this.sku}&origin_domain=${window.location.hostname}`
    if(this.testMode) url = `https://api.avatarxr.me/product_lookup?ean=210000013798&origin_domain=0.0.1`
    console.log(url)
    try {
      const response = await fetch(url)
      console.log(response)
      const data = await response.json()
      console.log(data)
      if(data.product_id) {
        this.product_id = data.product_id
        this.showButton()
      }
    }
    catch(err) {
      console.log(err)
    }
  }

  viewInFittingRoom(e) {
    const event = new CustomEvent('xr-modal:ready', {detail: { product_id: this.product_id, sku: this.sku, content: "<p>Modal content</p>" }})
    document.dispatchEvent(event)
  }

  showButton() {
    const height = this.button.scrollHeight
    this.button.parentNode.style.height = `${height}px`
    if(!this.button.classList.contains('loaded')) this.button.classList.add('loaded')
  }
}

customElements.define('fitting-room-button', FittingRoomButton)

class XRModal extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.container = this.querySelector('#xr-modal--container')
    this.contentWrapper = this.querySelector('.xr-modal--content')
    this.closeBtn = this.querySelector('#xr--close')
    this.FITTING_ROOM_ID = localStorage.getItem('fitting_room_id')
    
    document.addEventListener('xr-modal:ready', this.prepareFittingRoom.bind(this))
    this.closeBtn.addEventListener('click', this.closeModal.bind(this))

    window.addEventListener('message', this.handleFittingRoomResponse.bind(this))
  }

  handleFittingRoomResponse(e) {
    const data = typeof(e.data) == 'string' ? JSON.parse(e.data) : e.data
    console.log(data, data.fitting_room_id)
    if(data.fitting_room_id) {
      localStorage.setItem('fitting_room_id', data.fitting_room_id)
      if(!this.FITTING_ROOM_ID) this.FITTING_ROOM_ID = data.fitting_room_id
    }
  }

  prepareFittingRoom(e) {
    console.log(e.detail)
    const id = e.detail.product_id
    const iframe = document.createElement('iframe')
    const lang = document.documentElement.getAttribute('lang')
    console.log(lang)

    const query = new URLSearchParams({
      origin_domain: window.location.hostname,
      selected_lang: lang || "nl",
      origin_url: window.location.origin
    })

    
    if(!this.FITTING_ROOM_ID) {
      const url = `https://container.avatarxr.me/product/${id}?${query.toString()}`
      console.log(url)
      iframe.setAttribute('src', url)
    }
    else {
      const url = `https://container.avatarxr.me/fitting-room/${this.FITTING_ROOM_ID}?product_id=${id}&${query.toString()}`
      console.log(url)
      iframe.setAttribute('src', url)
    }

    iframe.style.width = '100%'
    iframe.style.height = `${window.innerHeight - 180}px`
    console.log(iframe.style.height, window.innerHeight)
    this.contentWrapper.appendChild(iframe)
    this.showModal()
  }

  showModal() {
    const body = document.body
    if(this.container.classList.contains('out')) this.container.classList.remove('out')
    if(!this.container.classList.contains('active')) this.container.classList.add('active')
    if(!body.classList.contains('xr-modal--active')) body.classList.add('xr-modal--active')
  }

  closeModal(e) {
    const body = document.body
    if(!this.container.classList.contains('out')) this.container.classList.add('out')
    if(body.classList.contains('xr-modal--active')) body.classList.remove('xr-modal--active')

    this.contentWrapper.innerHTML = ""
  }
}

customElements.define('xr-modal', XRModal)