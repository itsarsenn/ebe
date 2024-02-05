const list = document.querySelector('.products')
const getBtn = document.querySelector('.get')
const postBtn = document.querySelector('.post')
const patchBtn = document.querySelector('.patch')
const deleteBtn = document.querySelector('.delete')




const changeLikes = (url, userId, updatedData) => {
	return new Promise((resolve, reject) =>
		fetch(`${url}/${userId}`, {
			method: 'PATCH',
			body: JSON.stringify(updatedData),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

const getData = url => {
	return new Promise((resolve, reject) =>
		fetch(url)
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}
const postData = (url, product) => {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(product),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

const patchData = (url, product) => {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(product),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

const delData = url => {
	return new Promise((resolve, reject) =>
		fetch(url, { method: 'DELETE' })
			.then(response => response.text())
			.then(text => resolve(text))
			.catch(error => reject(error))
	)
}
let product 
// отобразить все продукты
getBtn.addEventListener('click', async e => {
	e.preventDefault()
	try {
	
		const products = await getData('http://localhost:3000/PRODUCTS')
		
		products.forEach(product => {
			
			list.insertAdjacentHTML(
				`beforeend`,
				`<li class="productItem" data-id="${product.id}">
  <div class="block-color" style="background: ${product.color}"></div>
  <div class="text-info">
    <p class="title">${product.title}</p>
    <p class="like">${product.like} likes</p>
    <p class="dislike">${product.dislike} dislikes</p>
  </div>
</li>`
			)
		})
		const likes = document.querySelectorAll('.like')
		likes.forEach(like => {
			like.addEventListener('click', () => {
				const id = like.parentNode.id
				like.textContent = like.textContent.split(" ")
				let likesNumber = like.textContent[0]
				likesNumber++
				like.textContent = likesNumber
				like.textContent = like.textContent + " likes"
				changeLikes(URL, id, { likes: likesNumber })
			})
		})
		const dislikes = document.querySelectorAll('.dislike')
		dislikes.forEach(dislike => {
			dislike.addEventListener('click', () => {
				const id = dislike.parentNode.id
				dislike.textContent = dislike.textContent.split(" ")
				let likesNumber = dislike.textContent[0]
				likesNumber++
				dislike.textContent = likesNumber
				dislike.textContent = dislike.textContent + " likes"
				changeLikes(URL, id, { likes: likesNumber })
			})
		})

		
		
	} catch (error) {
		console.log(error)
	}
})


postBtn.addEventListener('click', async e => {
	e.preventDefault()
	let title = prompt('введите имя')
	let like = +prompt('введите лайки ')
	let dislike = +prompt('введите дизлайки')
	

	let color = prompt('введите цвет')
	try {
		await postData('http://localhost:3000/PRODUCTS', {
			id: title.trim(''),
			title,
			like,
			dislike ,
			color
		}).then(response => {
			console.log(response, 'данные успешно добавлены')
		})
	} catch (error) {
		console.error(error)
	}
})

// удалить продукт

deleteBtn.addEventListener('click', async e => {
	e.preventDefault()
	const id = prompt('введите id')
	try {
		delData(`http://localhost:3000/PRODUCTS/${id}`).then(response => {
			console.log(response, `продукт с id = ${id} успешно удалён`)
		})
	} catch (err) {
		console.error(err, 'ошибка при удалении')
	}
})
		
