<template>
    <div>
        <Breadcrumbs title="Create Business"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">

              <div class="col-sm-12">

                <div class="card">

                  <div class="card-header"> 
                    <h5> PRODUCER CHAIN GROUPS </h5>
                  </div>

                  <div class="card-body row pricing-content">

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">
                        <div class="ribbon ribbon-clip-right ribbon-right ribbon-danger"> Taken </div>
                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$10</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> LIVESTOCK FARMERS </h3>
                          <!-- <h3 class="font-primary"> FEEDLOTS </h3>
                          <h3 class="font-primary"> EXPORT ZONES </h3> -->
                          <button @click="create('producer-chain-groups', 'livestock-farmer')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title=""> Create </button>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">

                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$20</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> PASTURE AND FEEDS </h3>
                          <button @click="create('producer-chain-groups', 'pasture-and-feeds')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title=""> Create </button>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">
                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$30</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> ACCESORIES AND EQUIPMENTS </h3>
                          <button @click="create('producer-chain-groups', 'accesories-and-equipments')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title="">Create</button>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">
                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$30</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> VETCARE SERVICES </h3>
                          <button @click="create('producer-chain-groups', 'vetcare')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title="">Create</button>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">
                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$30</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> AGROVET COMPANY </h3>
                          <button @click="create('producer-chain-groups', 'agrovet')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title="">Create</button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div class="col-sm-12">

                <div class="card">

                  <div class="card-header"> 
                    <h5> PROCESSER CHAIN GROUPS </h5>
                  </div>

                  <div class="card-body row pricing-content">

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">
                        <div class="ribbon ribbon-clip-right ribbon-right ribbon-danger"> Taken </div>
                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$10</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> Abattoir </h3>
                          <button @click="create('processer-chain-groups', 'abattoir')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title=""> Create </button>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">

                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$20</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> Slaughter House </h3>
                          <button @click="create('processer-chain-groups', 'slaughter-house')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title=""> Create </button>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">
                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$30</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> Value Addition Company </h3>
                          <button @click="create('processer-chain-groups', 'value-addition')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title=""> Create </button>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">
                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$30</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> Eateries And Restaurants </h3>
                          <button @click="create('processer-chain-groups', 'eateries-and-restaurants')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title=""> Create </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div class="col-sm-12">

                <div class="card">

                  <div class="card-header"> 
                    <h5> Supply CHAIN GROUPS </h5>
                  </div>

                  <div class="card-body row pricing-content">

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">
                        <div class="ribbon ribbon-clip-right ribbon-right ribbon-danger"> Taken </div>
                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$10</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> DISTRIBUTOR </h3>
                          <button @click="create('supply-chain-groups', 'distributor')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title=""> Create </button>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">

                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$20</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> WHOLESALER </h3>
                          <button @click="create('supply-chain-groups', 'wholesaler')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title=""> Create </button>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">
                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$30</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> RETAILER </h3>
                          <button @click="create('supply-chain-groups', 'retailer')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title=""> Create </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>


              <div class="col-sm-12">

                <div class="card">

                  <div class="card-header"> 
                    <h5> Facility CHAIN GROUPS </h5>
                  </div>

                  <div class="card-body row pricing-content">

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">
                        <div class="ribbon ribbon-clip-right ribbon-right ribbon-danger"> Taken </div>
                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$10</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> LOGISTICS AND FREIGHT COMPANY </h3>
                          <button @click="create('storage-chain-groups', 'logistics-and-freight')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title=""> Create </button>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">

                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$20</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> STORAGE AND WAREHOUSING COMPANY </h3>
                          <button @click="create('storage-chain-groups', 'storage-and-warehousing')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title=""> Create </button>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">
                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$30</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>Month
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> BRANDING AND PACKAGING Company </h3>
                          <button @click="create('storage-chain-groups', 'branding-and-packaging')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title=""> Create </button>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="pricing-block card text-center">
                        <svg x="0" y="0" viewBox="0 0 360 220">
                          <g>
                            <path fill="#4466f2" d="M0.732,193.75c0,0,29.706,28.572,43.736-4.512c12.976-30.599,37.005-27.589,44.983-7.061                                        c8.09,20.815,22.83,41.034,48.324,27.781c21.875-11.372,46.499,4.066,49.155,5.591c6.242,3.586,28.729,7.626,38.246-14.243                                        s27.202-37.185,46.917-8.488c19.715,28.693,38.687,13.116,46.502,4.832c7.817-8.282,27.386-15.906,41.405,6.294V0H0.48                                        L0.732,193.75z"></path>
                          </g>
                          <text transform="matrix(1 0 0 1 69.7256 116.2686)" fill="#fff" font-size="78.4489">$30</text>
                          <text transform="matrix(0.9566 0 0 1 197.3096 83.9121)" fill="#fff" font-size="29.0829">.99</text>
                          <text transform="matrix(1 0 0 1 233.9629 115.5303)" fill="#fff" font-size="15.4128">/Month</text>
                        </svg>
                        <div class="pricing-inner">
                          <h3 class="font-primary"> HANDLING AND DELIVERY Company </h3>
                          <button @click="create('storage-chain-groups', 'handling-and-delivary')" class="btn btn-pill btn-outline-primary btn-lg" type="button" data-original-title="btn btn-primary btn-lg" title=""> Create </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
        </div>
        <!-- Container-fluid Ends-->

        <Create v-on:close-modal="close_model" :data="data" style="display: none;" id="model-create-business" />

    </div>
</template>

<script>
import Create from "./create"
export default {
  data() {
    return {
      data: {}
    }
  },
  components: {
    Create
  },
  methods: {
    create: function(category, sub_category) {

      let modal = new Custombox.modal({
        content: {
          effect: 'slip',
          target: '#model-create-business'
        }
      })

      this.data = {
        category,
        sub_category
      }

      modal.open()

    },
    close_model: function() {

      Custombox.modal.close()

    }
  }
}
</script>