import { useStore } from "../../hooks/useStore"
import { useForm, SubmitHandler } from "react-hook-form"
import { TStudentScore } from "../../store/store.types"

export const Form = () => {
  // TODO: fix classes to be constant - removing item removes options too
  const {
    state: { classes },
    actions: { addRecord }
  } = useStore()

  // if (!classes.length) return null

  interface FormValues extends TStudentScore {}

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = data => {
    addRecord(data)
  }

  // TODO: componetize input group fields (input + label)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form form--add-record">
        <h2 className="heading">Add new record</h2>
        <fieldset>
          <div className="form-group">
            <label className="form-label -required" htmlFor="name">
              Student Name
            </label>
            <input
              {...register("name")}
              type="text"
              className="form-input"
              placeholder="Alex..."
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label -required" htmlFor="score">
              Score
            </label>
            <input
              {...register("score")}
              type="number"
              className="form-input"
              placeholder="0"
              min="0"
              max="100"
              step="1"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label -required" htmlFor="class">
              Class
            </label>
            <select {...register("class")} className="form-input -select" name="class">
              <option value="">-</option>
              {classes.map((option, i) => (
                <option key={i}>{option}</option>
              ))}
            </select>
          </div>
          {/* TODO: disbale Save button if required fields are missing */}
          <button className="btn" type="submit">
            Save
          </button>
        </fieldset>
      </form>
    </div>
  )
}

/* Fields: Student Name, Score, Class */
