import dayjs from "dayjs"
import {schedulesDay} from "../schedules/load.js"

import { scheduleNew } from "../../services/schedule-new.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

//Data atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

//Carrega a data atual
selectedDate.value = inputToday

//Define a data mínima como sendo a atual
selectedDate.min = inputToday


form.onsubmit = async (event) => {
    //Previne comportamento padrão de recarregar a página
    event.preventDefault()

    try {
        //Recuperando o nome do cliente
        const name = clientName.value.trim()
        
        if(!name){
            return alert("Informe o nome do cliente")
        }


        //Recuperando o horário selecionado.
        const hourSelected = document.querySelector(".hour-selected")

        if(!hourSelected) {
            return alert("Selecione a hora.")
        }

        //Recupera somente a hora
        const [hour] = hourSelected.innerText.split(":")

        //Insere a hora na data
        const when = dayjs(selectedDate.value).add(hour, "hour")
        
        //Gera um ID
        const id = new Date().getTime()

        //Faz o agendamento
        await scheduleNew ({
            id,
            name,
            when
        })

        //Recarrega a página para atualizar os agendamentos
        schedulesDay()

        //Limpa o formulário
        clientName.value = ""

    } catch (error) {

        alert("Não foi possível realizar o agendamento")
        console.log(error)
    }

}