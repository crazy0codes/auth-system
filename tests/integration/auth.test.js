const request = require('supertest');
const app = require('../../server');
const sql = require('../../config/db');

describe('Auth Routes', () => {
    before(async () => {
        await sql`TRUNCATE USERS_DEMO`;
    });

    it('should register a new user', (done) => {
        request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', email: 'demo@gmail.com', password: 'password' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('should login an existing user', (done) => {
        request(app)
            .post('/api/auth/login')
            .send({ email: 'demo@gmail.com', password: 'password' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('should get the user profile', (done) => {
        request(app)
            .post('/api/auth/user/profile')
            .send({ email: 'demo@gmail.com', password: 'password' })
            .end((err, res) => {
                const token = res.body.token;
                request(app)
                    .get('/api/auth/profile')
                    .set('Authorization', `Bearer ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        done();
                    })
            });
    });
});
