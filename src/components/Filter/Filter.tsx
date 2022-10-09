import { useStore } from "../../hooks/useStore"
import { useEffect, useState } from "react"
import { uniqueFromArr } from "../../utils/helpers"
import { TbFilterOff, TbFilter } from "react-icons/tb"
import { Formik, Field } from "formik"

type TFilterValues = {
  name: string
  scoreMin: number
  scoreMax: number
  studentClass: string
}

export const Filter = () => {
  const [names, setNames] = useState<string[]>([])
  const [isFilter, setFilter] = useState<boolean>(false)
  const {
    state: { data, classes },
    actions: { setDataFiltered }
  } = useStore()

  useEffect(() => {
    if (!data.length) return

    const names = data.map(item => item.name)
    const unique = uniqueFromArr(names)
    setNames(unique.sort())
  }, [data])

  const handleApplyFilter = (values: TFilterValues) => {
    const { name, scoreMin, scoreMax, studentClass } = values

    if (!name && scoreMin === 0 && scoreMax === 100 && !studentClass) return

    setDataFiltered(data)

    if (!isFilter) {
      setFilter(true)
    }

    if (studentClass) {
      setDataFiltered(prev => prev.filter(item => item.class === studentClass))
    }

    if (name) {
      setDataFiltered(prev => prev.filter(item => item.name === name))
    }

    if (scoreMin > 0) {
      setDataFiltered(prev => prev.filter(item => item.score > scoreMin))
    }

    if (scoreMax < 100) {
      setDataFiltered(prev => prev.filter(item => item.score < scoreMax))
    }
  }

  const handleClearFilter = (resetFormFn: () => void) => {
    setFilter(false)
    setDataFiltered(data)
    resetFormFn()
  }

  // TODO: highlight form fields when its value is being used in filter
  // note: use initial values to do so

  return (
    <Formik
      initialValues={{
        name: "",
        scoreMin: 0,
        scoreMax: 100,
        studentClass: ""
      }}
      onSubmit={(values, actions) => handleApplyFilter(values)}
    >
      {props => (
        <form onSubmit={props.handleSubmit} className="form form--filter">
          <fieldset>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Student Name
              </label>
              <Field as="select" className="form-input -select" name="name">
                <option value="">-</option>
                {names.map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))}
              </Field>
            </div>
            <div className="form-group -merged">
              <div className="form-group">
                <label className="form-label" htmlFor="scoreMin">
                  Score Min
                </label>
                <Field
                  className="form-input"
                  type="number"
                  name="scoreMin"
                  placeholder="0"
                  min="0"
                  max="100"
                  step="1"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="scoreMax">
                  Score Max
                </label>
                <Field
                  className="form-input"
                  type="number"
                  name="scoreMax"
                  placeholder="0"
                  id=""
                  min="0"
                  max="100"
                  step="1"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="studentClass">
                Class
              </label>
              <Field as="select" className="form-input -select" name="studentClass">
                <option value="">-</option>
                {classes.map((option, i) => (
                  <option value={option} key={i}>
                    {option}
                  </option>
                ))}
              </Field>
            </div>
            <div className="btn-group -merged">
              <button className="btn" type="submit">
                <TbFilter />
                &nbsp;Filter
              </button>

              {/* TODO: animate clear button when NOT disabled - slide from underneath 'Filter' button */}
              <button
                className="btn -secondary"
                type="button"
                onClick={() => handleClearFilter(props.resetForm)}
                disabled={!isFilter}
              >
                <TbFilterOff />
                &nbsp;Clear
              </button>
            </div>
          </fieldset>
        </form>
      )}
    </Formik>
  )
}

/* Filter by: Score Value (min/max range), Class (multiple selection) */
