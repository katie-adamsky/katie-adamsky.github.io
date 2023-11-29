import { BLOCKS } from '@contentful/rich-text-types';

let side = "right";

const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, children) => <p>{children}</p>,
      [BLOCKS.HEADING_1]: (_node, children) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (_node, children) => <h2>{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        if (side === "right") {
          side = "left";
        } else {
          side = "right";
        }
        return (<img className={`blog-post-image ${side}`}
          src={node.data?.target?.fields?.file?.url}
          alt={node.data?.target?.fields?.title}
        />);
      },
    },
  };

export default options;