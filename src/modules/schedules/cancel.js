import {schedulesDay} from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"


const periods = document.querySelectorAll(".period")

// Gera evento de clique para cada lista(manhã, tarde, noite)

periods.forEach((period) => {
    period.addEventListener("click", async (event) => {
        if (event.target.classList.contains("cancel-icon")) {
            const item = event.target.closest("li")
            const {id} = item.dataset
            
            if (id){
                // Confirma a exclusão
                const isConfirm = confirm(
                    "Deseja realmente cancelar este agendamento?"
                )

                if (isConfirm) {
                    // Remove o agendamento da interface
                    await scheduleCancel({id})
                    schedulesDay()
                }
            }
        }
    })
})