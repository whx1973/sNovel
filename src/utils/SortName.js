const getSortName = function (sortId) {
	switch(sortId){
		case 1:
			return '玄幻';
		case 2:
			return '仙侠';
		case 3:
			return '都市';
		case 4:
			return '历史';
		case 5:
			return '游戏';
		case 6:
			return '科幻';
		case 7:
			return '恐怖';
		case 8:
			return '女生';
		default:
			return '其他';
	}
}
export default getSortName;