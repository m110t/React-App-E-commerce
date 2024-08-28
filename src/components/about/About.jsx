
import blogimgg from '../../assets/th-removebg-preview.png'; // Adjust path based on actual location

export function About(){
return <div className='mt-5 about overflow-hidden'>
    <h1 className="text-center fs-1 mt-5">About</h1>
    <div className="line justify-content-center">
        <hr />
        <img src={blogimgg} className="star-text" alt="Start React" />
        <hr />
      </div>

<div className='d-flex w-50 m-auto mt-5 text-white about-media justify-content-between '>
    <p className='p-1'>Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.

</p>
<p className='mb-5 p-1'>You can create your own custom avatar for the masthead, change the icon in the dividers, and add your email address to the contact form to make it fully functional!

</p>
</div>




</div>






}