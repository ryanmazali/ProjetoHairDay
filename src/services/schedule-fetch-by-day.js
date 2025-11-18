import { apiConfig } from "./api-config.js"
import dayjs from "dayjs"

// CORREÇÃO 1: Adicione as chaves { } ao redor de 'date'
export async function scheduleFetchByDay({ date }){
    try {
        // Fazendo a requisição para a API.
        const response = await fetch(`${apiConfig.baseURL}/schedules`)

        // Convertendo os dados em JSON.
        const data = await response.json()

        // Filtra os agendamentos pelo dia selecionado.
        const dailySchedules = data.filter(schedule => 
            dayjs(date).isSame(schedule.when, "day")
        )

        // DEBUG: Mostra no console o que a API encontrou
        console.log("Agendamentos encontrados:", dailySchedules)

        // CORREÇÃO 2 (A PRINCIPAL): Retornar a lista filtrada!
        return dailySchedules
        
    } catch (error) {
        console.log(error)
        alert("Não foi possível carregar os agendamentos")
        // Boa prática: retornar array vazio em caso de erro para não quebrar o forEach
        return [] 
    }
}