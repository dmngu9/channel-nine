const utils = require('./utils');

describe('parse JSON payload', () => {
    it('should return result in right format for show with drm enabled and episodeCount > 0', () => {
        const payload = [
            {
                country: 'UK',
                description: 'What\'s life like when you have enough children to field your own football team?',
                drm: true,
                episodeCount: 3,
                genre: 'Reality',
                image: {
                    showImage: 'http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg'
                },
                language: 'English',
                nextEpisode: null,
                primaryColour: '#ff7800',
                seasons: [
                    {
                        slug: 'show/16kidsandcounting/season/1'
                    }
                ],
                slug: 'show/16kidsandcounting',
                title: '16 Kids and Counting',
                tvChannel: 'GEM'
            },
            {
                country: 'USA',
                description: 'The Taste puts',
                drm: false,
                episodeCount: 2,
                genre: 'Reality',
                image: {
                    showImage: 'http://mybeautifulcatchupservice.com/img/shows/TheTaste1280.jpg'
                },
                language: 'English',
                nextEpisode: {
                    channel: null,
                    channelLogo: 'http://mybeautifulcatchupservice.com/img/player/logo_go.gif',
                    date: null,
                    url: 'http://go.ninemsn.com.au/'
                },
                slug: 'show/thetaste',
                title: 'The Taste',
                tvChannel: 'GEM'
            },
            {
                country: 'Spain',
                description: 'Spain is lit',
                drm: true,
                episodeCount: 0,
                genre: 'Reality',
                image: {
                    showImage: 'http://mybeautifulcatchupservice.com/img/shows/TheTaste1280.jpg'
                },
                language: 'Spanish',
                nextEpisode: {
                    channel: null,
                    channelLogo: 'http://mybeautifulcatchupservice.com/img/player/logo_go.gif',
                    date: null,
                    url: 'http://go.ninemsn.com.au/'
                },
                slug: 'show/spain',
                title: 'The Spain',
                tvChannel: 'Nine'
            }
        ];

        const response = utils.parseJSONPayload(payload);

        expect(response).toEqual(
            [
                {
                    slug: 'show/16kidsandcounting',
                    title: '16 Kids and Counting',
                    image: 'http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg'
                }
            ]
        )
    });

    it('should put undefined in required returned fields that are not exist in the payload', () => {
        const payload = [{
            country: 'Spain',
            description: 'Spain is lit',
            drm: true,
            episodeCount: 2,
            genre: 'Reality',
            language: 'Spanish',
            nextEpisode: {
                channel: null,
                channelLogo: 'http://mybeautifulcatchupservice.com/img/player/logo_go.gif',
                date: null,
                url: 'http://go.ninemsn.com.au/'
            },
            slug: 'show/spain',
            tvChannel: 'Nine'
        }];

        const response = utils.parseJSONPayload(payload);

        expect(response).toEqual([
            {
                title: undefined,
                image: undefined,
                slug: 'show/spain'
            }
        ]);
    });

    it ('should return empty response array if payload is empty', () => {
        const payload = [];

        const response = utils.parseJSONPayload(payload);

        expect(response).toEqual([]);
    });

    it ('should return empty response array if payload is undefined', () => {
        const response = utils.parseJSONPayload(undefined);

        expect(response).toEqual([]);
    });
});