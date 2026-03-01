export default function Aboutthrees({ icon, title, description }) {
  return (
    <div className="threeBlock-card">
      {icon ? <img className="threeBlock-icon" src={icon} alt="" /> : null}
      <h3 className="threeBlock-title">{title}</h3>
      <p className="threeBlock-desc">{description}</p>
    </div>
  );
}