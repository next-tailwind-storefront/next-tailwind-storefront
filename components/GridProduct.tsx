import Link from "next/link";
import { ProductFragment } from "types/graphql";
import { FadeInImage } from "components";

export default function GridProduct({ node }: { node?: ProductFragment }) {
  return node ? (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <Link
        href={{
          pathname: "/product/[productId]",
          query: { productId: node.id },
        }}
      >
        <div className="block relative h-48 rounded overflow-hidden">
          <FadeInImage
            className="object-cover object-center w-full h-full block"
            alt={node.images.edges?.[0]?.node.altText ?? ""}
            src={node.images.edges?.[0]?.node.thumbnailSrc}
            layout="fill"
          />
        </div>
      </Link>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {node.vendor}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {node.title}
        </h2>
        <p className="mt-1">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: node.variants.edges?.[0]?.node?.priceV2.currencyCode,
          }).format(node.variants.edges?.[0]?.node?.priceV2.amount)}
        </p>
      </div>
    </div>
  ) : null;
}
