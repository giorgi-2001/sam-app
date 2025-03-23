import {
  useQuery
} from "@tanstack/react-query"
import Form from "./Form"

export const apiUrl = "https://jdfbvophf5.execute-api.us-east-1.amazonaws.com/Prod/"


export interface ITodo {
  todo_id: string
  task: string
  is_completed: string
}

const App = () => {

  const { isPending, error, data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(apiUrl)
      return await response.json()
    }
  })


  let content

  if (isPending) {
    content = (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  } else if (error) {
    content = <div>{ JSON.stringify(error) }</div>
  } else if (todos && !todos?.length) {
    content = <div>No Todos yet...</div>
  } else if (todos && todos?.length){
    content = <ul className="list-group">
      {
        todos.map((todo: ITodo) => {
          let isCompleted = false
          if (todo.is_completed == "True") {
            isCompleted = false
          }
          return (
            <li className="list-group-item d-flex gap-3 align-items-center" key={todo.todo_id}>
              <input checked={isCompleted} className="form-check-input me-1" type="checkbox" aria-label="..." />
              <span>
                {todo.task}
              </span>
              <button className="btn btn-outline-danger d-block ms-auto">
                <i className="bi bi-trash-fill"></i>
              </button>
            </li>
          )
        })
      }
    </ul>
  }
    
  return (
    <>
      <header className="container-sm text-center">
        <h1 className="display-4 mb-4 py-4">
          Welcome to our Todo App
        </h1>
      </header>
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 p-4 bg-light border-1 border border-1 rounded-1">
            <Form />
          </div>
        </div>
      </div>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            {content}
          </div>
        </div>
      </main>
    </>
  )
}

export default App