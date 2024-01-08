<% if(useTypescript) { %>
import request from 'supertest';
import { app } from '../../server';
<% } else { %>
const request = require('supertest');
const app = require('../../server');
<% } %>

describe('Test the main controller', () => {
  it('says the application is alive', async () => {
    const expectedResponse = 'It\'s alive !';

    const response = await request(app)
      .get('/')
      .send()
      .expect(200)

    expect(response.<% if(isApiRest) { %>body<% } else { %>text<%}%>).toBe(expectedResponse);
  })
})