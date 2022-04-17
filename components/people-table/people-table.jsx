
import React, {useState} from 'react';
import Styles from "./people-table.module.css"
import { useSort,  HeaderCellSort , } from '@table-library/react-table-library/sort'
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { useRowSelect, HeaderCellSelect,CellSelect,SelectTypes,} from '@table-library/react-table-library/select';
import { useTheme } from '@table-library/react-table-library/theme';

const testJson = [
  {
    "id": "1",
    "_id": "6258ccf87ac2516151bf8f1d",
    "nome": "Ana",
    "sobrenome": "Silva",
    "nacionalidade": "Brasil",
    "cep": "08280-630",
    "estado": "São Paulo",
    "cidade": "São Paulo",
    "logradouro": "Morubixaba 712",
    "email": "aninhasilva@tutanota.com",
    "telefone": "(11)94744-1928",
    "__v": 0,
    "cpf": "123-456-789-70"
  },
  {
    "id": "2",
    "_id": "6259891eec59f2b33731ecde",
    "nome": "Mariana  ",
    "sobrenome": "Alves",
    "nacionalidade": "Brasil",
    "cep": "88813-586",
    "estado": "Santa Catarina",
    "cidade": "Criciúma",
    "logradouro": "Morubixaba 712",
    "email": "MarianaRibeiroAlves@armyspy.com",
    "telefone": "(48)97699-8369",
    "__v": 0,
    "cpf": "223-456-789-70"
  },
  {
    "id": "3",
    "_id": "6259b0ac84724a0684e031d2",
    "nome": "Isabela",
    "sobrenome": "Oliveira",
    "nacionalidade": "Brasil",
    "cep": "36202-166",
    "cpf": "516.464.596-36",
    "estado": "MG",
    "cidade": "Barbacena",
    "logradouro": "Rua Irene Piazzi, 1138",
    "email": "IsabelaMeloOliveira@jourrapide.com",
    "telefone": "(32) 5011-7654",
    "__v": 0
  },
  {
    "id": "4",
    "_id": "6259b0af84724a0684e031d5",
    "nome": "Fernanda",
    "sobrenome": "Fernandes",
    "nacionalidade": "Brasil",
    "cep": "85903-707",
    "cpf": "798.534.527-23",
    "estado": "Parana",
    "cidade": "Toledo",
    "logradouro": "Rua Cláudio Areco, 517",
    "email": "FernandaBarrosFernandes@teleworm.us",
    "telefone": "(45)99612-9907",
    "__v": 0
  },
  {
    "id": "5",
    "_id": "625b21da898495f0a1c59963",
    "nome": "Alice",
    "sobrenome": "Margatroid",
    "nacionalidade": "Japão",
    "cep": "12954-428",
    "cpf": "553.456.957-33",
    "estado": "SP",
    "cidade": "Atibaia",
    "logradouro": "Rua do Rochedo",
    "email": "alice.margatroid",
    "telefone": "(11) 3784-2009",
    "__v": 0
  },
  {
    "id": "6",
    "_id": "625b2348898495f0a1c59967",
    "nome": "Kauê",
    "sobrenome": "Dias",
    "nacionalidade": "Brasil",
    "cep": "66623-308",
    "cpf": "462.994.516-45",
    "estado": "PA",
    "cidade": "Belém",
    "logradouro": "Passagem P-4",
    "email": "KaueMeloDias@teleworm.us",
    "telefone": "(91) 9517-8834",
    "__v": 0
  },
  {
    "id": "7",
    "_id": "625b23e9898495f0a1c59969",
    "nome": "Gabrielle",
    "sobrenome": "Oliveira",
    "nacionalidade": "Brazil",
    "cep": "52131-591",
    "cpf": "408.510.621-05",
    "estado": "PE",
    "cidade": "Recife",
    "logradouro": "1ª Travessa da Sucupira",
    "email": "GabrielleSouzaOliveira@dayrep.com",
    "telefone": "(81) 8250-3441",
    "__v": 0
  },
  {
    "id": "8",
    "_id": "625b25aa898495f0a1c5996b",
    "nome": "Vinicius",
    "sobrenome": "Lima",
    "nacionalidade": "Brasil",
    "cep": "06326-120",
    "cpf": "832.268.607-20",
    "estado": "SP",
    "cidade": "Carapicuíba",
    "logradouro": "Rua Pará",
    "email": "ViniciusSilvaLima@armyspy.com",
    "telefone": "(11) 3543-3552",
    "__v": 0
  },
  {
    "id": "9",
    "_id": "625b2629898495f0a1c5996d",
    "nome": "Maria",
    "sobrenome": "Ferreira",
    "nacionalidade": "Brasil",
    "cep": "06390-040",
    "cpf": "914.373.597-52",
    "estado": "SP",
    "cidade": "Carapicuíba",
    "logradouro": "Rua Maura dos Santos",
    "email": "MariaCardosoFerreira@rhyta.com",
    "telefone": "(11) 5637-8248",
    "__v": 0
  }
]




export function PeopleTable(props){
  const [search, setSearch] = useState("")
    const data = {nodes: props.data.filter((value) => (
      value.nome?.toLowerCase().includes(search) || value.sobrenome?.toLowerCase().includes(search) ||
      value.nacionalidade?.toLowerCase().includes(search) || value.cep?.toLowerCase().includes(search) ||
      value.estado?.toLowerCase().includes(search) || value.cidade?.toLowerCase().includes(search) ||
      value.logradouro?.toLowerCase().includes(search) || value.email?.toLowerCase().includes(search) ||
      value.telefone?.toLowerCase().includes(search) 
      ))

    }
    const resize = {minWidth: 50}
    const handleSearch = (event) => {
      setSearch(event.target.value);
    };

    const theme = useTheme({
      Table: `
        height: 100%;
      `,
      BaseCell: `     
        &:nth-of-type(1) ,&:nth-of-type(3) ,&:nth-of-type(4) ,&:nth-of-type(6){
          min-width: 50px;
          width: 150px;
      }
      &:nth-of-type(2){
        min-width: 50px;
        width: 175px;
      }
      &:nth-of-type(5){
        min-width: 50px;
        width: 85px;
      }
      &:nth-of-type(7), &:nth-of-type(8), &:nth-of-type(9){
        min-width: 50px;
        width: 200px;
      }
      &:nth-of-type(10){
        min-width: 50px;
        width: 50px;

      }
      `

    });

    const sort = useSort(
      data,
      {
        onChange: onSortChange,
      },
      {
        sortFns: {
          NOME: (array) => array.sort((a, b) => a.nome.localeCompare(b.nome)),
          SOBRENOME: (array) => array.sort((a, b) => a.sobrenome.localeCompare(b.sobrenome)),
          NACIONALIDADE: (array) => array.sort((a, b) => a.nacionalidade.localeCompare(b.nacionalidade)),
          CEP: (array) => array.sort((a, b) => a.cep.localeCompare(b.cep)),
          ESTADO: (array) => array.sort((a, b) => a.estado.localeCompare(b.estado)),
          CIDADE: (array) => array.sort((a, b) => a.cidade.localeCompare(b.cidade)),
          LOGRADOURO: (array) => array.sort((a, b) => a.logradouro.localeCompare(b.logradouro)),
          EMAIL: (array) => array.sort((a, b) => a.email.localeCompare(b.email)),
          TELEFONE: (array) => array.sort((a, b) => a.telefone.localeCompare(b.telefone)),
        },
      },
    );

    function onSortChange(action, state) {
      console.log(search)
      console.log(action, state);
    }
    const select = useRowSelect(data, {
      onChange: props.onSelectChange,
    },
    
    {
      rowSelect: SelectTypes.SingleSelect,
      buttonSelect: SelectTypes.SingleSelect,
    });


    return(
      <>
      <div className={Styles.search}>
        <label htmlFor="search">
          <span>Procurar:</span>
          <input type="text" onChange={handleSearch} />
        </label>
      </div>
        <div
        className={Styles.forms}

      >
        <Table data={data} sort={sort} theme={theme}  layout={{ custom: true, horizontalScroll: true }} select={select}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow className={Styles.header}>
                  <HeaderCellSort  resize={resize} sortKey="NOME">Nome</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="SOBRENOME">Sobrenome</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="NACIONALIDADE">Nacionalidade</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="CEP">CEP</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="ESTADO">UF</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="CIDADE"> Cidade</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="LOGRADOURO">Logradouro</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="EMAIL">Email</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="TELEFONE">Telefone</HeaderCellSort >
                  <HeaderCellSelect />
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item)=>(
                  <Row key={item.id} item={item} className={Styles.row}>
                    <Cell>{item.nome}</Cell>
                    <Cell>{item.sobrenome}</Cell>
                    <Cell>{item.nacionalidade}</Cell>
                    <Cell>{item.cep}</Cell>
                    <Cell>{item.estado}</Cell>
                    <Cell>{item.cidade}</Cell>
                    <Cell>{item.logradouro}</Cell>
                    <Cell>{item.email}</Cell>
                    <Cell>{item.telefone}</Cell>
                    <CellSelect item={item} />
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </div>
    </>
    )
}