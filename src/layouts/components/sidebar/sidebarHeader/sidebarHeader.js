// import external modules
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "react-feather";
// import internal(own) modules
import { FoldedContentConsumer } from "../../../../utility/context/toggleContentContext";
import Logo from "../../../../assets/img/bazingaLogo.png";
import B_LOGO from "../../../../assets/img/B_LOGO.png";
class SidebarHeader extends Component {
   handleClick = e => {
      this.props.toggleSidebarMenu("close");
   };

   render() {
      return (
         <FoldedContentConsumer>
            {context => (
           
               <div className="sidebar-header">
                  <div className="logo clearfix">
                     <NavLink to="/" className="logo-text">
                        <div className="logo-img">
                        { context.foldedContent ? <img src={B_LOGO} alt="logo" width="190" />:<img src={Logo} alt="logo" width="190" />}
                        </div>

                     </NavLink>
                     <span className="nav-toggle d-none d-sm-none d-md-none d-lg-block">
                        {context.foldedContent ? (
                           <ChevronRight onClick={context.makeNormalContent} className="toggle-icon" size={16} />
                        ) : (
                              <ChevronLeft onClick={context.makeFullContent} className="toggle-icon" size={16} />
                           )}
                     </span>
                      <span href="" className="nav-close d-block d-md-block d-lg-none d-xl-none" id="sidebarClose">
                         <X onClick={this.handleClick} size={20} />
                      </span>
                  </div>
               </div>
            )}
         </FoldedContentConsumer>
      );
   }
}

export default SidebarHeader;
