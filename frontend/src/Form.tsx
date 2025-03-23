import { FormEvent, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiUrl } from "./App"


const Form = () => {
    const [task, setTask] = useState("")

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ task })
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"]})
        }
    })


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
       e.preventDefault()
       mutation.mutate()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                />
                <button className="btn btn-primary">
                    Add new Todo
                </button>
            </div>
        </form>
    )
}

export default Form