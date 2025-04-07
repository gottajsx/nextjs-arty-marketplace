import "@styles/WorkList.scss"
import WorkCard from "./WorkCard"

const WorkList = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((work) => (
        <WorkCard
          key={work._id}
          work={work}
        />
      ))}
    </div>
  )
}

export default WorkList