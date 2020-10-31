export const shuffleArr = (arr) => {
	let j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

export const getRandomElements = (n, arr) => arr.sort(() => 0.5 - Math.random()).slice(0, n);