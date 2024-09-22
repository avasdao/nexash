---
title: NexaShell REST API

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript
  - python
  - rust
  - php
  - java
  - kotlin
  - swift

toc_footers:
  - <a href='javascript://'>Sign Up for a Developer Key</a>
  - <div style='margin-top:5px'><span style='font-size:1.2em;'>Recommended Links</span></div>
  - <span>&nbsp; &nbsp;</span> — <a href='https://avasdao.org' target='_blank'>avasdao.org</a>

includes:
  - errors

search: true

code_clipboard: true

meta:
  - name: description
    content: API Docs for NexaShell
---

# Introduction

Welcome to the NexaShell API You can use our API to access NexaShell API endpoints, which can get information on various coins, tokens, and assets in our database.

We have language bindings in JavaScript, Python, PHP and Rust! You can view code examples in the dark area to the right, and you can switch the programming language of the examples with the tabs in the top right.

This example API documentation page was created with [Slate](https://github.com/slatedocs/slate). Feel free to edit it and use it as a base for your own API's documentation.

# Authentication

> To authorize, use this code:

```ruby
require 'nexa'

api = NexaShell::APIClient.authorize!('satoshisghost')
```

```python
import pynexa

api = pynexa.authorize('satoshisghost')
```

```shell
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here" \
  -H "Authorization: satoshisghost"
```

```javascript
import Nexa as 'nexajs'

let token = Nexa.getToken('satoshisghost')
```

> Make sure to replace `satoshisghost` with your API key.

NexaShell uses API keys to allow access to the API. You can register a new NexaShell API key at our [developer portal](https://nexa.sh/pro).

NexaShell expects for the API key to be included in all API requests to the server in a header that looks like the following:

`Authorization: satoshisghost`

<aside class="notice">
You must replace <code>satoshisghost</code> with your personal API key.
</aside>

# Stratum v1

## Get All Kittens

```ruby
require 'kittn'

api = NexaShell::APIClient.authorize!('satoshisghost')
api.kittens.get
```

```python
import pynexa

api = pynexa.authorize('satoshisghost')
api.kittens.get()
```

```shell
curl "http://example.com/api/kittens" \
  -H "Authorization: satoshisghost"
```

```javascript
const Nexa = require('nexajs');

let api = Nexa.authorize('satoshisghost');
let profiles = api.profiles.get();
```

> The above command returns JSON structured like this:

```json
[
  {
    "id": 1,
    "name": "Satoshi Nakamoto",
    "breed": "creator",
    "fluffiness": 6,
    "cuteness": 7
  },
  {
    "id": 2,
    "name": "Hal Finney",
    "breed": "tester",
    "fluffiness": 5,
    "cuteness": 10
  }
]
```

This endpoint retrieves all kittens.

### HTTPS Request

`GET https://nexa.sh/v1/profiles`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
include_cats | false | If set to true, the result will also include cats.
available | true | If set to false, the result will include kittens that have already been adopted.

<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>

## Get a Specific Kitten

```ruby
require 'kittn'

api = NexaShell::APIClient.authorize!('satoshisghost')
api.kittens.get(2)
```

```python
import kittn

api = kittn.authorize('satoshisghost')
api.kittens.get(2)
```

```shell
curl "http://example.com/api/kittens/2" \
  -H "Authorization: satoshisghost"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('satoshisghost');
let max = api.kittens.get(2);
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Max",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

<aside class="warning">Inside HTML code blocks like this one, you can't use Markdown, so use <code>&lt;code&gt;</code> blocks to denote code.</aside>

### HTTP Request

`GET http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the kitten to retrieve

## Delete a Specific Kitten

```ruby
require 'kittn'

api = NexaShell::APIClient.authorize!('satoshisghost')
api.kittens.delete(2)
```

```python
import kittn

api = kittn.authorize('satoshisghost')
api.kittens.delete(2)
```

```shell
curl "http://example.com/api/kittens/2" \
  -X DELETE \
  -H "Authorization: satoshisghost"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('satoshisghost');
let max = api.kittens.delete(2);
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "deleted" : ":("
}
```

This endpoint deletes a specific kitten.

### HTTP Request

`DELETE http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the kitten to delete
