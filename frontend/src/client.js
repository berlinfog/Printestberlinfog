import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId : "p0vc1u5f",
    dataset : "production",
    apiVersion : "2022-01-25",
    useCdn : true,
    token : "sk6QslHbtxFe8Hzs3GqHgZkdvIar0voK8heJm305FNTJeCMR69zXNMQibaxQCoXmKOpHyGiyoM5r7UwqEjtSRXlyBT51jBfYK01aMY1rSr9aiMf1s41xZl4PHeWPcxup8LULKrXjVNOkrrH1aiPGN4xYOwAnIIc7XC7EE6CvdJlnCyVa6vmi",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
