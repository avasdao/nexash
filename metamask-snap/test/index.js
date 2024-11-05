import { expect } from '@jest/globals'
import { installSnap } from '@metamask/snaps-jest'
import { panel, text } from '@metamask/snaps-sdk'
import { getAccount } from './packages/snap/src/rpc/account.js'
// import { CashAddressNetworkPrefix } from './lib/libauth'

describe('onRpcRequest', () => {
    describe('nexa_getAddress', () => {
        it('mainnet', async () => {
            const { request } = await installSnap()
            const origin = 'Jest'
            const { response } = await request({
                method: 'nexa_getAddress',
                origin,
                params: {
                    network: 'mainnet'
                }
            })

            expect((response as any).result)
                .toEqual('nexa:qzy4uffd2444u4hxyxjlp2uwexxzz5zcxgpd5g9yux')
        })

        it('testnet', async () => {
            const { request } = await installSnap();
            const origin = 'Jest';
            const { response } = await request({
                method: 'nexa_getAddress',
                origin,
                params: {
                    network: 'testnet'
                }
            })

            expect((response as any).result)
                .toEqual('nexatest:qp3xhucyvmpd0jldmjrv2lmdqj87pp0jnufuhc2rs9')
        })
    })

    describe('nexa_showWIF', () => {
        it('true', async () => {
            const { request } = await installSnap();
            const origin = 'Jest'
            const response = request({
                method: 'nexa_showWIF',
                origin,
                params: {
                    network: 'testnet'
                }
            })

            const ui = await response.getInterface()
            expect(ui.type).toBe('confirmation')
            await ui.ok()

            const ui1: any = await response.getInterface()
            await ui1.ok()

            expect(((await response).response as any).result).toBe(true)
        })

        it('false', async () => {
            const { request } = await installSnap()
            const origin = 'Jest'
            const response = request({
                method: 'nexa_showWIF',
                origin,
                params: {
                    network: 'testnet'
                }
            })

            const ui = await response.getInterface()
            await ui.cancel()

            expect(((await response).response as any).result).toBe(false)
        })
    })

    describe('nexa_getPublicKey', () => {
        it('mainnet', async () => {
            const { request } = await installSnap()
            const origin = 'Jest'
            const { response } = await request({
                method: 'nexa_getPublicKey',
                origin,
                params: {
                    network: 'mainnet'
                }
            })

            expect((response as any).result)
                .toEqual('0x0470e8d02ece43ef83d350a5ab3047f78cb5dab59d551940297129066e6879e7de8aa5d4415b22c96aff55478cf2c20c7380d5bd579ec3bad642c1c939086f75c7')
        })

        it('testnet', async () => {
            const { request } = await installSnap()
            const origin = 'Jest'
            const { response } = await request({
                method: 'nexa_getPublicKey',
                origin,
                params: {
                    network: 'testnet'
                }
            })

            expect((response as any).result)
                .toEqual('0x04fcbbf4c8055a8e04271d4e36dec9be5bdfdfe544fc7ccf8b80e71d11b080b09830e1776c66e99ffbe73accfd2d367e9631eac125d5983a6cfa2f4a514eb7c6f5')
        })
    })

    it('nexa_signTransaction', async () => {
        const { request } = await installSnap()
        const origin = 'Jest'
        const response = request({
            method: 'nexa_signTransaction',
            origin,
            params: {
                network: 'testnet',
                unsignedTx: '{"transaction":{"inputs":[{"outpointIndex":3,"outpointTransactionHash":{"0":83,"1":0,"2":147,"3":32,"4":66,"5":209,"6":79,"7":138,"8":70,"9":88,"10":8,"11":147,"12":244,"13":20,"14":140,"15":1,"16":251,"17":161,"18":71,"19":219,"20":35,"21":15,"22":170,"23":255,"24":35,"25":69,"26":22,"27":80,"28":42,"29":246,"30":21,"31":65},"sequenceNumber":0,"unlockingBytecode":{}},{"outpointIndex":3,"outpointTransactionHash":{"0":84,"1":200,"2":18,"3":141,"4":94,"5":224,"6":125,"7":101,"8":236,"9":1,"10":178,"11":4,"12":17,"13":101,"14":253,"15":103,"16":12,"17":95,"18":52,"19":26,"20":54,"21":80,"22":39,"23":4,"24":113,"25":57,"26":13,"27":30,"28":172,"29":173,"30":231,"31":105},"sequenceNumber":0,"unlockingBytecode":{}},{"outpointIndex":3,"outpointTransactionHash":{"0":163,"1":129,"2":159,"3":112,"4":158,"5":242,"6":25,"7":77,"8":37,"9":7,"10":105,"11":111,"12":117,"13":8,"14":240,"15":253,"16":247,"17":172,"18":140,"19":38,"20":154,"21":110,"22":186,"23":102,"24":86,"25":44,"26":79,"27":217,"28":11,"29":178,"30":121,"31":107},"sequenceNumber":0,"unlockingBytecode":{}},{"outpointIndex":3,"outpointTransactionHash":{"0":217,"1":95,"2":73,"3":203,"4":64,"5":149,"6":209,"7":170,"8":223,"9":68,"10":149,"11":200,"12":218,"13":153,"14":100,"15":106,"16":178,"17":105,"18":189,"19":78,"20":161,"21":198,"22":15,"23":199,"24":89,"25":83,"26":237,"27":85,"28":189,"29":241,"30":132,"31":6},"sequenceNumber":0,"unlockingBytecode":{}},{"outpointIndex":0,"outpointTransactionHash":{"0":74,"1":251,"2":178,"3":166,"4":124,"5":211,"6":228,"7":234,"8":194,"9":175,"10":93,"11":173,"12":220,"13":146,"14":55,"15":45,"16":101,"17":54,"18":209,"19":58,"20":164,"21":123,"22":216,"23":71,"24":73,"25":207,"26":188,"27":225,"28":84,"29":224,"30":16,"31":197},"sequenceNumber":0,"unlockingBytecode":{}},{"outpointIndex":1,"outpointTransactionHash":{"0":104,"1":107,"2":144,"3":3,"4":122,"5":184,"6":147,"7":236,"8":198,"9":34,"10":165,"11":181,"12":109,"13":45,"14":3,"15":55,"16":177,"17":29,"18":37,"19":70,"20":37,"21":223,"22":41,"23":8,"24":19,"25":41,"26":73,"27":236,"28":183,"29":129,"30":198,"31":75},"sequenceNumber":0,"unlockingBytecode":{}}],"locktime":0,"outputs":[{"lockingBytecode":{"0":169,"1":20,"2":8,"3":74,"4":2,"5":15,"6":51,"7":255,"8":185,"9":23,"10":31,"11":174,"12":91,"13":106,"14":103,"15":68,"16":104,"17":65,"18":109,"19":235,"20":123,"21":40,"22":135},"valueSatoshis":"57000"},{"lockingBytecode":{"0":118,"1":169,"2":20,"3":252,"4":195,"5":205,"6":98,"7":162,"8":26,"9":123,"10":24,"11":70,"12":169,"13":41,"14":17,"15":178,"16":56,"17":88,"18":121,"19":124,"20":88,"21":70,"22":122,"23":136,"24":172},"valueSatoshis":"946092"}],"version":2},"sourceOutputs":[{"outpointIndex":3,"outpointTransactionHash":{"0":83,"1":0,"2":147,"3":32,"4":66,"5":209,"6":79,"7":138,"8":70,"9":88,"10":8,"11":147,"12":244,"13":20,"14":140,"15":1,"16":251,"17":161,"18":71,"19":219,"20":35,"21":15,"22":170,"23":255,"24":35,"25":69,"26":22,"27":80,"28":42,"29":246,"30":21,"31":65},"sequenceNumber":0,"unlockingBytecode":{},"lockingBytecode":{"0":118,"1":169,"2":20,"3":252,"4":195,"5":205,"6":98,"7":162,"8":26,"9":123,"10":24,"11":70,"12":169,"13":41,"14":17,"15":178,"16":56,"17":88,"18":121,"19":124,"20":88,"21":70,"22":122,"23":136,"24":172},"valueSatoshis":"1467"},{"outpointIndex":3,"outpointTransactionHash":{"0":84,"1":200,"2":18,"3":141,"4":94,"5":224,"6":125,"7":101,"8":236,"9":1,"10":178,"11":4,"12":17,"13":101,"14":253,"15":103,"16":12,"17":95,"18":52,"19":26,"20":54,"21":80,"22":39,"23":4,"24":113,"25":57,"26":13,"27":30,"28":172,"29":173,"30":231,"31":105},"sequenceNumber":0,"unlockingBytecode":{},"lockingBytecode":{"0":118,"1":169,"2":20,"3":252,"4":195,"5":205,"6":98,"7":162,"8":26,"9":123,"10":24,"11":70,"12":169,"13":41,"14":17,"15":178,"16":56,"17":88,"18":121,"19":124,"20":88,"21":70,"22":122,"23":136,"24":172},"valueSatoshis":"1142"},{"outpointIndex":3,"outpointTransactionHash":{"0":163,"1":129,"2":159,"3":112,"4":158,"5":242,"6":25,"7":77,"8":37,"9":7,"10":105,"11":111,"12":117,"13":8,"14":240,"15":253,"16":247,"17":172,"18":140,"19":38,"20":154,"21":110,"22":186,"23":102,"24":86,"25":44,"26":79,"27":217,"28":11,"29":178,"30":121,"31":107},"sequenceNumber":0,"unlockingBytecode":{},"lockingBytecode":{"0":118,"1":169,"2":20,"3":252,"4":195,"5":205,"6":98,"7":162,"8":26,"9":123,"10":24,"11":70,"12":169,"13":41,"14":17,"15":178,"16":56,"17":88,"18":121,"19":124,"20":88,"21":70,"22":122,"23":136,"24":172},"valueSatoshis":"1467"},{"outpointIndex":3,"outpointTransactionHash":{"0":217,"1":95,"2":73,"3":203,"4":64,"5":149,"6":209,"7":170,"8":223,"9":68,"10":149,"11":200,"12":218,"13":153,"14":100,"15":106,"16":178,"17":105,"18":189,"19":78,"20":161,"21":198,"22":15,"23":199,"24":89,"25":83,"26":237,"27":85,"28":189,"29":241,"30":132,"31":6},"sequenceNumber":0,"unlockingBytecode":{},"lockingBytecode":{"0":118,"1":169,"2":20,"3":252,"4":195,"5":205,"6":98,"7":162,"8":26,"9":123,"10":24,"11":70,"12":169,"13":41,"14":17,"15":178,"16":56,"17":88,"18":121,"19":124,"20":88,"21":70,"22":122,"23":136,"24":172},"valueSatoshis":"1467"},{"outpointIndex":0,"outpointTransactionHash":{"0":74,"1":251,"2":178,"3":166,"4":124,"5":211,"6":228,"7":234,"8":194,"9":175,"10":93,"11":173,"12":220,"13":146,"14":55,"15":45,"16":101,"17":54,"18":209,"19":58,"20":164,"21":123,"22":216,"23":71,"24":73,"25":207,"26":188,"27":225,"28":84,"29":224,"30":16,"31":197},"sequenceNumber":0,"unlockingBytecode":{},"lockingBytecode":{"0":118,"1":169,"2":20,"3":252,"4":195,"5":205,"6":98,"7":162,"8":26,"9":123,"10":24,"11":70,"12":169,"13":41,"14":17,"15":178,"16":56,"17":88,"18":121,"19":124,"20":88,"21":70,"22":122,"23":136,"24":172},"valueSatoshis":"13000"},{"outpointIndex":1,"outpointTransactionHash":{"0":104,"1":107,"2":144,"3":3,"4":122,"5":184,"6":147,"7":236,"8":198,"9":34,"10":165,"11":181,"12":109,"13":45,"14":3,"15":55,"16":177,"17":29,"18":37,"19":70,"20":37,"21":223,"22":41,"23":8,"24":19,"25":41,"26":73,"27":236,"28":183,"29":129,"30":198,"31":75},"sequenceNumber":0,"unlockingBytecode":{},"lockingBytecode":{"0":118,"1":169,"2":20,"3":252,"4":195,"5":205,"6":98,"7":162,"8":26,"9":123,"10":24,"11":70,"12":169,"13":41,"14":17,"15":178,"16":56,"17":88,"18":121,"19":124,"20":88,"21":70,"22":122,"23":136,"24":172},"valueSatoshis":"985538"}]}'
            }
        })

        const ui = await response.getInterface()
        expect(ui.type).toBe('confirmation')
        await ui.ok()

        expect(await response)
            .toRespondWith("02000000064115f62a50164523ffaa0f23db47a1fb018c14f4930858468a4fd142209300530300000064411c94f81eee65dbab2b442ea734bd672de6f2d585e99c5aeeadb39226772de5e4fb4941c258da049f2f018fb4ee5e7b2be0a3f27c026756110a887756d29a6af3412103fcbbf4c8055a8e04271d4e36dec9be5bdfdfe544fc7ccf8b80e71d11b080b0980000000069e7adac1e0d3971042750361a345f0c67fd651104b201ec657de05e8d12c854030000006441c274bba834bb9315b0bf81188df7e4482cea5a165704fb22f9e3479852ceb2e0f771b755b32168ce02b60a58615df7c85995cc16edb899a4460097d4314396a5412103fcbbf4c8055a8e04271d4e36dec9be5bdfdfe544fc7ccf8b80e71d11b080b098000000006b79b20bd94f2c5666ba6e9a268cacf7fdf008756f6907254d19f29e709f81a3030000006441920de8af19ed4a6bbd063116677eeee59e2eb2317420777edc009cd9b6967e2c54be3bff6551f450178bf2e5e751423fd130c65b0381334f55afe433ba0697ee412103fcbbf4c8055a8e04271d4e36dec9be5bdfdfe544fc7ccf8b80e71d11b080b098000000000684f1bd55ed5359c70fc6a14ebd69b26a6499dac89544dfaad19540cb495fd90300000064415bfc32edf0c168d8020656f46ed3fe72453a6b3ec99aaa89d743ae6bab3ce7d50287cc55e998665bc5566cf9e3a0ad6bb99eec3a4d5722db140b66a940513661412103fcbbf4c8055a8e04271d4e36dec9be5bdfdfe544fc7ccf8b80e71d11b080b09800000000c510e054e1bccf4947d87ba43ad136652d3792dcad5dafc2eae4d37ca6b2fb4a0000000064415b8546ca29142b998a858cf66c75314289230ceb12dad69b6d526e823a430ab012c9507fe0d55e7b4f2abdb7bdbd2806b72ae538fc9fdbf588fb358399d8d997412103fcbbf4c8055a8e04271d4e36dec9be5bdfdfe544fc7ccf8b80e71d11b080b098000000004bc681b7ec4929130829df2546251db137032d6db5a522c6ec93b87a03906b68010000006441c8b75443871228f08ff4dc00a79499f382d60eac0f8c9d6460b608f38c14aa54375658cfff91edb548ae90e275186ba3e4f21835d7c4e18c2ea48b8155b3d6a9412103fcbbf4c8055a8e04271d4e36dec9be5bdfdfe544fc7ccf8b80e71d11b080b0980000000002a8de00000000000017a914084a020f33ffb9171fae5b6a674468416deb7b2887ac6f0e00000000001976a914fcc3cd62a21a7b1846a92911b23858797c58467a88ac00000000");
    })

    it('nexa_signTransactionForArg', async () => {
        const { request } = await installSnap()
        const origin = 'Jest'
        const response = request({
            method: 'nexa_signTransactionForArg',
            origin,
            params: {
                network: 'testnet',
                unsignedTx: `{"transaction":{"inputs":[{"outpointIndex":0,"outpointTransactionHash":{"0":198,"1":170,"2":174,"3":164,"4":96,"5":73,"6":212,"7":39,"8":220,"9":180,"10":232,"11":218,"12":118,"13":91,"14":147,"15":194,"16":38,"17":218,"18":106,"19":77,"20":45,"21":47,"22":150,"23":151,"24":182,"25":215,"26":226,"27":226,"28":57,"29":30,"30":133,"31":52},"sequenceNumber":4294967294,"unlockingBytecode":{}}],"locktime":184569,"outputs":[{"lockingBytecode":{"0":118,"1":169,"2":20,"3":58,"4":23,"5":130,"6":232,"7":47,"8":185,"9":202,"10":112,"11":3,"12":156,"13":72,"14":75,"15":34,"16":87,"17":241,"18":53,"19":217,"20":141,"21":165,"22":130,"23":136,"24":172},"valueSatoshis":"1000"},{"lockingBytecode":{"0":169,"1":20,"2":105,"3":223,"4":217,"5":120,"6":254,"7":66,"8":122,"9":166,"10":159,"11":158,"12":26,"13":46,"14":81,"15":248,"16":213,"17":56,"18":214,"19":142,"20":216,"21":102,"22":135},"valueSatoshis":"1000","token":{"amount":"0","category":{"0":198,"1":170,"2":174,"3":164,"4":96,"5":73,"6":212,"7":39,"8":220,"9":180,"10":232,"11":218,"12":118,"13":91,"14":147,"15":194,"16":38,"17":218,"18":106,"19":77,"20":45,"21":47,"22":150,"23":151,"24":182,"25":215,"26":226,"27":226,"28":57,"29":30,"30":133,"31":52},"nft":{"capability":"minting","commitment":{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0,"32":0,"33":0,"34":0,"35":0,"36":0,"37":0,"38":0,"39":0}}}},{"lockingBytecode":{"0":118,"1":169,"2":20,"3":111,"4":3,"5":26,"6":168,"7":65,"8":75,"9":114,"10":195,"11":123,"12":168,"13":186,"14":51,"15":27,"16":203,"17":122,"18":52,"19":5,"20":18,"21":77,"22":112,"23":136,"24":172},"valueSatoshis":"50000"},{"lockingBytecode":{"0":169,"1":20,"2":195,"3":230,"4":225,"5":233,"6":50,"7":140,"8":94,"9":131,"10":210,"11":54,"12":125,"13":23,"14":140,"15":40,"16":8,"17":65,"18":191,"19":247,"20":233,"21":62,"22":135},"valueSatoshis":"1000"},{"lockingBytecode":{"0":106,"1":6,"2":67,"3":82,"4":67,"5":55,"6":50,"7":49,"8":1,"9":116,"10":76,"11":0,"12":20,"13":252,"14":195,"15":205,"16":98,"17":162,"18":26,"19":123,"20":24,"21":70,"22":169,"23":41,"24":17,"25":178,"26":56,"27":88,"28":121,"29":124,"30":88,"31":70,"32":122,"33":8,"34":0,"35":0,"36":0,"37":0,"38":5,"39":245,"40":225,"41":0,"42":4,"43":0,"44":0,"45":0,"46":1},"valueSatoshis":"0"}],"version":2},"sourceOutputs":[{"lockingBytecode":{"0":169,"1":20,"2":8,"3":74,"4":2,"5":15,"6":51,"7":255,"8":185,"9":23,"10":31,"11":174,"12":91,"13":106,"14":103,"15":68,"16":104,"17":65,"18":109,"19":235,"20":123,"21":40,"22":135},"valueSatoshis":"57000"}],"bytecode":{"0":82,"1":5,"2":116,"3":116,"4":0,"5":116,"6":116,"7":65,"8":4,"9":192,"10":131,"11":200,"12":55,"13":5,"14":80,"15":128,"16":103,"17":187,"18":251,"19":131,"20":253,"21":249,"22":98,"23":100,"24":211,"25":193,"26":233,"27":115,"28":90,"29":161,"30":122,"31":62,"32":214,"33":135,"34":230,"35":219,"36":103,"37":251,"38":81,"39":198,"40":202,"41":157,"42":163,"43":232,"44":161,"45":167,"46":218,"47":65,"48":54,"49":118,"50":255,"51":151,"52":178,"53":38,"54":208,"55":246,"56":60,"57":249,"58":212,"59":115,"60":59,"61":59,"62":243,"63":31,"64":118,"65":225,"66":247,"67":109,"68":43,"69":208,"70":151,"71":131,"72":119,"73":83,"74":122,"75":124,"76":173,"77":124,"78":127,"79":117,"80":169,"81":3,"82":118,"83":169,"84":20,"85":124,"86":126,"87":2,"88":136,"89":172,"90":126,"91":0,"92":205,"93":135},"inputIndex":0}`
            }
        });

        const ui = await response.getInterface()
        expect(ui.type).toBe('confirmation')
        await ui.ok()

        expect(await response)
            .toRespondWith("ea35d7935a427b8e52d4b03da289ce6a34d049f30bceb65850a3cf63678dd6f92771b4cdb2132a75bf1d1fe374b7213dae559fb5c4dbca1d015997b3cc53928b61");
    })

    it('nexa_switchAddress', async () => {
        const { request } = await installSnap()
        const origin = 'Jest'
        const response = request({
            method: 'nexa_switchAddress',
            origin,
            params: {
                network: 'testnet'
            }
        })

        const ui = await response.getInterface()
        expect(ui.type).toBe('prompt')
        await ui.ok('2')
        expect(await response)
            .toRespondWith('nexatest:qpk54xqr4j2q89eakslxketqxfq8clz9vvgc0vk2x9');

        {
            const { response } = await request({
                method: 'nexa_getAddress',
                origin,
                params: {
                    network: 'testnet'
                }
            })

            expect((response as any).result)
                .toEqual('nexatest:qpk54xqr4j2q89eakslxketqxfq8clz9vvgc0vk2x9')
        }
    })

    it('throws an error if the requested method does not exist', async () => {
        const { request, close } = await installSnap();
        const response = await request({
            method: 'foo',
        })

        expect(response).toRespondWithError({
            code: -32603,
            message: 'Method not found.',
            stack: expect.any(String),
        })

        await close()
    })
})
