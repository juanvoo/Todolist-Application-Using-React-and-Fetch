import React, { useState, useEffect } from "react";

const Home = () => {

	const url = 'https://assets.breatheco.de/apis/fake/todos/user/astrid1';

	const [inputText, setInputText] = useState([]);
	const [inputValue, setinputValue] = useState();  
	
    const get = () => {
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		
			.then(resp => { return resp.json(); })
			.then(data =>
				setInputText(data))
			.catch(error => {
				console.log(error)

			}
			);
	}
	const newUser = () => {
		fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(respuesta =>{
			if(respuesta.ok)
			get()
		})
		.catch(error=>
			console.log("error"))
	}

	useEffect(() => {
		get()
		newUser()
	}, []);

	const actualizarlista = (data) => {
		console.log(data)
		fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
		})
			.then(respuesta => {
				console.log(respuesta.status)
				if (respuesta.ok)
					get()
			
			})
			.catch(error =>
				console.log("hay un error")
			)
	}
	const deletelist = () => {
		fetch(url, {
			method: "DELETE",
			body: JSON.stringify(),
			headers: {
				"Content-Type": "application/json"
			}})
			.then(response => {
				if(response.ok)
					newUser()
					
			})
		
	}


	function borrarelemento(why) {
		const listaborrar = inputText.filter(valor => valor !== why)
		actualizarlista(listaborrar)
	}
  

	return (
		<div className="container">
      <div className="card">
  <div className="card-body"></div>
			<h1 className="card-title d-flex justify-content-center display-1 text-black-50">todos</h1>
			
			<div className="container shadow p-1 bg-white rounded col-8 bi bi-x-lg">
				<input type="text" value={inputValue} onChange={(e) => setinputValue(e.target.value)}
					onKeyDown={(e) => {

						let newObj = { label: inputValue, done: false };
						let aux = [...inputText, newObj]

						let array = Array.from(e.target.value);
						let filterarray = array.filter(words => words !== " ");

						if (e.key === "Enter" && filterarray.length) {
							actualizarlista(aux)
							setInputText(aux);
							setinputValue("")
						}
					}}

					className="form-control"
					aria-describedby="basic-addon1" />

				<div className="text-center">
					<ul className="list-group">
						{inputText.map((texto, index) => {
							return (
								<li key={index}
									className="container list-group-item">{texto.label}
									<button
										type="button"
										className="btn-close"
										onClick={() => borrarelemento(texto)}></button></li>

							)
						})}
					</ul>
				</div>
				
			</div>

			<div className="container d-flex justify-content-center text-center mt-4">
				<button type="button" onClick={() => deletelist()} className="mt-3 bg-info w-100" value>Borrar</button>
			</div>
		</div>
		</div>
	);
};

export default Home;
