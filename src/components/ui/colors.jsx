import { useDispatch } from "react-redux"
import { addColor, removeColor } from "@/redux/features/textureSlice"
import { cn } from "@/lib/utils"


export const Colors = ({ colors, width, height, className }) => {
  const dispatch = useDispatch()

  const onChange = (e) => {
    const value = e.target.value
    const checked = e.target.checked
    if (checked) {
      dispatch(addColor(value))
    } else if (!checked) {
      dispatch(removeColor(value))
    }

  }

  return (
    <div className={cn("flex gap-x-2", className)}>
      {
        colors?.map((color, index) => {
          return (
            <div key={index}>
              <input
                type="radio"
                name="color"
                value={color}
                id={`color${index}`}
                onChange={onChange}
                className="hidden input-color"
              />
              <label
                htmlFor={`color${index}`}
                className='rounded-sm cursor-pointer'
                style={{ backgroundColor: color, width: width, height: height }}
              >
              </label>
            </div>
          )
        })
      }
    </div>
  )
}