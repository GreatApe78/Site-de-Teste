var web3 = new Web3(ethereum);


var mateus_abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_nome",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_preco",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "nome",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "preco",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "lerDono",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_novoPreco",
                "type": "uint256"
            }
        ],
        "name": "mudarPreco",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_novoNome",
                "type": "string"
            }
        ],
        "name": "mudarNome",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    },
    {
        "inputs": [],
        "name": "sacarGrana",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
var mateus_address = "0x8DF86AA357FB579097045D14479eba8C7C07F7F4"


var ver_dono_btn = document.getElementById("ver_dono_btn")

var ver_dono_saida = document.getElementById("ver_dono_saida")




var ver_nome_btn = document.getElementById("ver_nome_btn");

var ver_nome_saida = document.getElementById("ver_nome_saida");


var mudar_nome_btn = document.getElementById("mudar_nome_btn");
var texto_novo_nome = document.getElementById("texto_novo_nome");

var sacar_eth_btn = document.getElementById("sacar_eth_btn");

var mudar_preco_btn = document.getElementById("mudar_preco_btn")

var caixa_novo_preco = document.getElementById("caixa_novo_preco")
async function lerDono() {

    if (ethereum) {
        try {
            var ktr = new web3.eth.Contract(mateus_abi, mateus_address)
            var chamada = await ktr.methods.lerDono().call()
            return chamada
        }
        catch (error) {
            alert("catch ler dono", error)

        }
    } else {
        alert("Instale o metamask")
    }
}
ver_dono_btn.addEventListener("click", () => {
    lerDono().then((chamada) => {
        ver_dono_saida.innerHTML = chamada
    }).catch((error) => {
        console.log(error)
    })
})




async function verNome() {
    if (ethereum) {
        try {
            var ktr = new web3.eth.Contract(mateus_abi, mateus_address)
            var chamada = ktr.methods.nome().call()
            return chamada
        }
        catch (error) {
            alert(error)
        }

    } else {

        alert("instale o metamask!")
    }





}

ver_nome_btn.addEventListener("click", () => {
    verNome().then((chamada) => {
        ver_nome_saida.innerHTML = chamada
    }).catch((error) => {

    })

})

async function mudarNome(_novo_nome) {
    if (ethereum) {

        try {

            var ktr = new web3.eth.Contract(mateus_abi, mateus_address)
            let accounts = await ethereum.request({ method: "eth_requestAccounts" })
            let account = accounts[0]
            let preco = await ktr.methods.preco().call()
            var chamada = ktr.methods.mudarNome(_novo_nome).send({ from: account, value: preco })
            return chamada



        } catch (error) {
            console.log(error)
        }


    } else {
        alert("Instale o metamask!")
    }

}

mudar_nome_btn.addEventListener("click", () => {
    mudarNome(texto_novo_nome.value).then((chamada) => {
        console.log(chamada)
    }).catch((error) => {
        console.log(error)
    })
})




async function sacarGrana() {
    if (ethereum) {
        try {
            var ktr = new web3.eth.Contract(mateus_abi, mateus_address)
            let accounts = await ethereum.request({ method: "eth_requestAccounts" })
            let account = accounts[0]
            var chamada = ktr.methods.sacarGrana().send({ from: account })
            return chamada
        } catch (error) {

            console.log(error)
        }

    } else {

        alert("instale o metamask")
    }




}

sacar_eth_btn.addEventListener("click", () => {

    sacarGrana().then((chamada) => {
        console.log(chamada)
    }).catch((error) => {
        console.log(error)
    })





})

async function mudarPreco(_novopreco) {

    if (ethereum) {
        try {
            var ktr = new web3.eth.Contract(mateus_abi, mateus_address)
            let accounts = await ethereum.request({ method: "eth_requestAccounts" })
            let account = accounts[0]
            var chamada = ktr.methods.mudarPreco(_novopreco).send({ from: account })
            return chamada
        } catch (error) {
            console.log(error)

        }
    } else {
        alert("INSTALE O METAMASK!")
    }




}

mudar_preco_btn.addEventListener("click", () => {

    mudarPreco(BigInt(Number(caixa_novo_preco.value) * 10 ** 18)).then((chamada) => {
        console.log(chamada)
    }).catch((error) => {
        console.log(error)
    })



})

