class EasyHTTP {
	async get(url) {
      const response = await fetch(url)
      const resData = await response.json()
      return resData
	}
	async post(url, data) {
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(data)
      })
      const resData = await response.json()
      return resData
	}
	async put(url, data) {
      const response = fetch(url, {
         method: 'PUT',
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(data)
      })
      const resData = await response
      return resData	
	}
	async delete(url) {
      const response = await fetch(url, {
         method: 'DELETE',
         headers: {
            'Content-type': 'application/json'
         }
      })
      const resData = await 'Item deleted'
      return resData
		
	}
}

export const http = new EasyHTTP()