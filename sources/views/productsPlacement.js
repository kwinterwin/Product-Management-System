import {JetView} from "webix-jet";

export default class ProductsPlacementView extends JetView{
    config(){
        const gridlayout = {
            view:"gridlayout",
            gridColumns:5, gridRows:5,
            cells:[
              { css:"boxy", template:"A1", x:0, y:0, dx:1, dy:1 },
              { css:"boxy", template:"B1", x:0, y:1, dx:1, dy:1 },
              { css:"boxy", template:"C1", x:0, y:2, dx:1, dy:1 },
              { css:"boxy", template:"D1", x:0, y:3, dx:1, dy:1 },
              { css:"boxy", template:"E1", x:0, y:4, dx:1, dy:1 },
              
              { css:"boxy", template:"A2", x:2, y:0, dx:1, dy:1 },
              { css:"boxy", template:"B2", x:2, y:1, dx:1, dy:1 },
              { css:"boxy", template:"C2", x:2, y:2, dx:1, dy:1 },
              { css:"boxy", template:"D2", x:2, y:3, dx:1, dy:1 },
              { css:"boxy", template:"E2", x:2, y:4, dx:1, dy:1 },
              
              { css:"boxy", template:"A3", x:4, y:0, dx:1, dy:1 },
              { css:"boxy", template:"B3", x:4, y:1, dx:1, dy:1 },
              { css:"boxy", template:"C3", x:4, y:2, dx:1, dy:1 },
              { css:"boxy", template:"D3", x:4, y:3, dx:1, dy:1 },
              { css:"boxy", template:"E3", x:4, y:4, dx:1, dy:1 },
            ]
          };

          return {
              rows:[
                //   {},
                  gridlayout
              ]
          }
    }
}