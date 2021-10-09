import React from "react";
import Box from "../Box";
import Typography from "../Typography";

export interface ProductDescriptionProps {
  description: string[];
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  return (
    <Box>
      {/* <H3 mb="1rem">Specification:</H3> */}
      <Typography>
        {description.map((item, idx) => {
          return <>
            <div key={idx}>{item} <br /></div>
          </>
        })}
      </Typography>
    </Box>
  );
};

export default ProductDescription;
