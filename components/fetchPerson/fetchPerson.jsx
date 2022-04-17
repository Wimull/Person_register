export async function fetchPerson(){
    const response = await fetch("http://localhost:3000/api/entry/Register?")
    const data = await response.json()
    if (response.status != 200) return ["error",response.status, {error: data}];
    console.log(data)
    data.map((obj) => obj.id = obj.cpf.replace(/[\.-]/g,""))  //Creates and id property so as RowSelect works properly (it only looks for property named "id")
    return data
}