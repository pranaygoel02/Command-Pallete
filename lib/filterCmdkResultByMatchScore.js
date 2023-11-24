export default function filterByMatchScore(data, searchTerm, percent = 80) {
  console.log(data, searchTerm, percent);  
  return data.filter((item) => {
      if (item.type === null) return true;
      const splittedArray = item?.matchResult?.split("<b>");
      console.log(splittedArray);
      return splittedArray?.length >= (percent / 100) * searchTerm?.length;
    });
  }
