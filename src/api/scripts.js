const API_ROOT 		= 'https://ghibliapi.herokuapp.com/';
const MODE_SEARCH = 0;
const MODE_GET 		= 1;


const callApi = async (value, mode) => {
	let fields 	 = (mode === MODE_SEARCH ? 'fields=title,id&' : '');
	let criteria = (mode === MODE_SEARCH ? `title_like=${value}&_sort=title` : `id=${value}`);
	const apiUrl = `${API_ROOT}films?${fields}${criteria}`

	let response = await fetch(apiUrl);
	return response.json();
}

export function getSearchResults(value, update) {
	if (value === '') {
		update([]);
	}
	else{
		callApi(value, MODE_SEARCH).then(
			response => {
				let results = response.map(item => {return ({id:item.id, value: item.title});});
				update(results);
			}
		);
	}
}

export function getMovie(id, update) {
	callApi(id, MODE_GET).then(		
		response => {
			let results = response.map(item => {return (
				{
					id: item.id,
					title: item.title,
					original: item.original_title,
					details: [
						{
							label: 'director',
							value: item.director
						},
						{
							label: 'producer',
							value: item.producer
						},
						{
							label: 'release_date',
							value: item.release_date
						},
						{
							label: 'running_time',
							value: item.running_time
						},
						{
							label: 'description',
							value: item.description
						},		
					]
				});
			});
			if (results.length > 0){
				update(results[0]);
			}
		}
	)
}