
export async function fetchPerson(){
    const response = await fetch("http://localhost:3000/api/entry/Register?")
    const data = await response.json()
    if (response.status != 200) return ["error",response.status, {error: data}];
    console.log(data)
    data.map((obj) => obj.id = obj.cpf.replace(/[\.-]/g,""))  //Creates and id property so as RowSelect works properly (it only looks for property named "id")
    return data
}

export async function fetchPersonByCpf(id, body, method){
    let cpf = id.id
    console.log(method)
    console.log(body, cpf)
    const response = await fetch(`http://localhost:3000/api/entry/Register/${cpf}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "access-control-allow-origin": "*"
        },
        body: JSON.stringify(body)
    }
    )
    console.log(response)
    const data = [await response.json()]
    console.log(data, "data")
    if (response.status != 200) return ["error",response.status, {error: data}];
    data.map((obj) => obj.id = obj.cpf.replace(/[\.-]/g,""))  //Creates and id property so as RowSelect works properly (it only looks for property named "id")
    return data
}