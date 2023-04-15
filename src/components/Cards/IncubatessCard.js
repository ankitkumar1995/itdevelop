import Image from "next/image"
const IncubateesCard=({image,title})=>{
    return(
        <div className="col-12 col-sm-6 col-md-6 col-lg-3 incub">
        <div className="incubatees__wrapper">
            <p>{title}</p>
            <Image src={image} width={40} height={10} className="incub__img"/>
        </div>
        </div>
    )
}
export default IncubateesCard