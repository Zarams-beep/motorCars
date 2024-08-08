const roughWork =()=>{
    // {data.map((item, index) => (
    //     <option key={index} value={item.year}>
    //     {item.year}
    //     </option>
    //      ))}

    const years=[2019,2020,2021,2022]
    localStorage.setItem('years', JSON.stringify(years));
    
}

export default roughWork