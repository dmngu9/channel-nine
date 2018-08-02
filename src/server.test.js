const request = require('supertest'); // eslint-disable-line 

const server = require('./server');

describe('Server', () => {
    it ('should return 400 when having invalid json in request payload', (done) => {
        request(server)
            .post('/')
            .send([])
            .set('Accept', 'application/json')
            .expect(400)
            .then(res => {
                expect(res.body).toEqual({
                    error: 'Could not decode request: JSON parsing failed'
                });
                done();
            });
    });

    it('should return 200 on landing page', (done) => {
        request(server)
            .get('/')
            .expect(200)
            .then(res => {
                expect(res.text).toBe('Welcome to Channel 9 page');
                done();
            });
    });

    it('should return 304 and parse JSON result on POST request', (done) => {
        request(server)
            .post('/')
            .send({
                payload: [
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
                ]
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).toEqual({
                    response: [
                        {
                            slug: 'show/16kidsandcounting',
                            title: '16 Kids and Counting',
                            image: 'http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg'
                        }
                    ]
                });
                done();
            });
    });

    it ('should return with empty response when request payload is not json format', (done) => {
        request(server)
            .post('/')
            .send('minh')
            .expect(200)
            .then(res => {
                expect(res.body).toEqual({
                    response: []
                });
                done();
            });
    });
});