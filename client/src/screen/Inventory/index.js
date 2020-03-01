import React from 'react';
import AddInventory from '../../components/addInventory';
import GetInventory from '../../components/getInventory';
import { APIGet, APIPatch, APIPost } from '../../api/api';

class Inventory extends React.Component {
  constructor() {
    super();
    this.addNewInventory = this.addNewInventory.bind(this);

    this.getConditions = this.getConditions.bind(this);
    this.getGraders = this.getGraders.bind(this);
    this.getPages = this.getPages.bind(this);

    // this.getSeries = this.getSeries.bind(this);
    this.getVendors = this.getVendors.bind(this);

    this.setActiveCondition = this.setActiveCondition.bind(this);
    this.setActiveGrader = this.setActiveGrader.bind(this);
    this.setActivePage = this.setActivePage.bind(this);

    // this.setActiveSeries = this.setActiveSeries.bind(this);
    this.setActiveIssue = this.setActiveIssue.bind(this);
    this.setActiveVendor = this.setActiveVendor.bind(this);

    this.setConditions = this.setConditions.bind(this);
    this.setGraders = this.setGraders.bind(this);
    this.setPages = this.setPages.bind(this);

    this.setInventory = this.setInventory.bind(this);
    // this.setSeries = this.setSeries.bind(this);
    this.setVendors = this.setVendors.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    inventory: [],
    vendors: [],
    condition: [],
    graders: [],
    pages: [],
    // series: [],
  };

  componentDidMount() {
    // this.getSeries();
    // this.getConditions();
    // this.getGraders();
    // this.getPages();
    // this.getVendors();
    // this.getInventory();
  }

  getInventory = async () => {
    try {
      const results = await APIGet('inventory');
      this.setState({ inventory: results });
    } catch (error) {
      console.log(error);
    }
  };

  // getSeries = async () => {
  //   try {
  //     const results = await APIGet(`series`);
  //     this.setSeries(results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  getVendors = async () => {
    try {
      const results = await APIGet('vendor');
      this.setVendors(results);
    } catch (error) {
      console.log(error);
    }
  };

  getConditions = async () => {
    try {
      const results = await APIGet('condition');
      this.setConditions(results);
    } catch (error) {
      console.log(error);
    }
  };

  getGraders = async () => {
    try {
      const results = await APIGet('grader');
      this.setGraders(results);
    } catch (error) {
      console.log(error);
    }
  };

  getPages = async () => {
    try {
      const results = await APIGet('page');
      this.setPages(results);
    } catch (error) {
      console.log(error);
    }
  };

  // setSeries = series => this.setState({ series });

  setVendors = vendors => this.setState({ vendors });

  setConditions = conditions => this.setState({ conditions });
  setGraders = graders => this.setState({ graders });
  setPages = pages => this.setState({ pages });

  setInventory = inventory => this.setState({ inventory });

  setActiveVendor = (event, value) => this.setState({ activeVendor: value });

  setActiveCondition = (event, value) => this.setState({ activeCondition: value });
  setActiveGrader = (event, value) => this.setState({ activeGrader: value });
  setActivePage = (event, value) => this.setState({ activePage: value });

  // setActiveSeries = (event, value) => this.setState({ activeSeries: value });

  setActiveIssue = (event, value) => this.setState({ activeIssue: value });

  addNewInventory = async comic => {
    const { bin, tag, notes, cost, aquired } = this.state;
    const { activeIssue, activeConditon, activeGrader, activePage, activeVendor } = this.state;
    const data = {
      bin,
      tag,
      notes,
      cost,
      aquired,
      issueId: activeIssue,
      conditionId: activeConditon,
      graderId: activeGrader,
      pageId: activePage,
      vendorId: activeVendor,
    };
    try {
      await APIPost('inventory', data);
      this.getInventory();
    } catch (error) {
      console.log(error);
    }
  };

  updateInventory = async item => {
    try {
      const results = await APIPatch('inventory/' + item.id, item);
      this.getInventory();
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = input => event => this.setState({ [input]: event.target.value });

  render() {
    return (
      <div>
        <AddInventory
          addNewInventory={this.addNewInventory}
          // activeSeries={this.state.activeSeries}
          activeCondition={this.state.activeCondition}
          activeGrader={this.state.activeGrader}
          activePage={this.state.activePage}
          activeVendor={this.state.activeVendor}
          // series={this.state.series}
          getVendors={this.getVendors}
          getConditions={this.getConditions}
          getGraders={this.getGraders}
          getPages={this.getPages}
          // getSeries={this.getSeries}
          conditions={this.state.conditions}
          graders={this.state.graders}
          pages={this.state.pages}
          handleChange={this.handleChange}
          // setActiveSeries={this.setActiveSeries}
          setActiveVendor={this.setActiveVendor}
          setActiveCondition={this.setActiveCondition}
          setActiveGrader={this.setActiveGrader}
          setActivePage={this.setActivePage}
          setActiveIssue={this.setActiveIssue}
          // setSeries={this.setSeries}
          updateInventory={this.updateInventory}
          vendors={this.state.vendors}
        />
        <GetInventory
          setInventory={this.setInventory}
          inventory={this.state.inventory}
          updateInventory={this.updateInventory}
        />
      </div>
    );
  }
}

export default Inventory;
