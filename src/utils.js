function parseJSONPayload(payload) {
    return payload.reduce((response, show) => {
        if (show.drm && show.episodeCount > 0) {
            const newShow = {
                slug: !!show.slug ? show.slug : undefined,
                title: !!show.title ? show.title : undefined,
                image: !!show.image ? show.image.showImage : undefined
            };

            response.push(newShow);
        }
        return response;
    }, []);
}

module.exports = parseJSONPayload;