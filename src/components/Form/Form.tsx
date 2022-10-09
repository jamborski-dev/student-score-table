import { useStore } from "../../hooks/useStore"
import { Formik, Field } from "formik"

export const Form = () => {
  // TODO: fix classes to be constant - removing item removes options too
  const {
    state: { classes },
    actions: { addRecord }
  } = useStore()

  if (!classes.length) return null

  const NEW_RECORD = {
    id: classes.length + 1,
    name: "",
    score: 0,
    class: ""
  }

  return (
    <Formik
      enableReinitialize
      initialValues={NEW_RECORD}
      onSubmit={(values, actions) => {
        actions.resetForm()
        addRecord(values)
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit} className="form form--add-record">
          <h2 className="heading">Add new record</h2>
          <fieldset>
            <div className="form-group">
              <label className="form-label -required" htmlFor="name">
                Student Name
              </label>
              <Field
                name="name"
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
              <Field
                name="score"
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
              <Field as="select" className="form-input -select" name="class">
                <option value="">-</option>
                {classes.map((option, i) => (
                  <option key={i}>{option}</option>
                ))}
              </Field>
            </div>
            {/* TODO: disbale Save button if required fields are missing */}
            <button className="btn" type="submit">
              Save
            </button>
          </fieldset>
        </form>
      )}
    </Formik>
  )
}

/* Fields: Student Name, Score, Class */
