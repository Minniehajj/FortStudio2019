import client from "@frontity/core/src/client";
import frontity__mars_theme_default from "@frontity/mars-theme/src/index";
import frontity__wp_source_default from "@frontity/wp-source/src/index";
import frontity__tiny_router_default from "@frontity/tiny-router/src/index";
import frontity__html2react_default from "@frontity/html2react/src/client";
import frontity_contact_form_7_default from "frontity-contact-form-7/src/index";

const packages = {
  frontity__mars_theme_default,
  frontity__wp_source_default,
  frontity__tiny_router_default,
  frontity__html2react_default,
  frontity_contact_form_7_default,
};

export default client({ packages });

